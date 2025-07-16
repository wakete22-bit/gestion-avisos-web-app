import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { ViewportService } from 'src/app/core/services/viewport.service';
import { InventarioService } from '../../services/inventario.service';

@Component({
  selector: 'app-crear-producto-modal',
  templateUrl: './crear-producto-modal.component.html',
  styleUrls: ['./crear-producto-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class CrearProductoModalComponent implements OnInit, AfterViewInit {
  productoForm: FormGroup;
  codigoGenerado: string = '';

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private viewportService: ViewportService,
    private elementRef: ElementRef,
    private inventarioService: InventarioService
  ) {
    this.productoForm = this.fb.group({
      codigo: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.maxLength(200)],
      stock: ['', [Validators.required, Validators.min(0)]],
      unidad: ['', Validators.required],
      precioNeto: ['', [Validators.required, Validators.min(0)]],
      pvp: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    addIcons({ closeOutline });
    this.generarCodigo();
  }

  ngAfterViewInit() {
    // Aplicar safe areas al modal después de que se renderice
    setTimeout(() => {
      const modalContainer = this.elementRef.nativeElement.querySelector('.modal-container');
      if (modalContainer) {
        this.viewportService.applySafeAreaToModal(modalContainer);
      }
    }, 100);
  }

  private generarCodigo() {
    this.codigoGenerado = this.inventarioService.generarCodigoProducto();
    this.productoForm.patchValue({ codigo: this.codigoGenerado });
  }

  async guardarProducto() {
    if (this.productoForm.valid) {
      const formData = this.productoForm.getRawValue();
      
      // Validar que el PVP sea mayor o igual al precio neto
      if (formData.pvp < formData.precioNeto) {
        // Mostrar error o ajustar automáticamente
        formData.pvp = formData.precioNeto;
      }

      await this.modalController.dismiss(formData, 'confirm');
    }
  }

  async cerrarModal() {
    await this.modalController.dismiss(null, 'cancel');
  }

  // Método para recalcular PVP automáticamente si se desea
  recalcularPVP() {
    const precioNeto = this.productoForm.get('precioNeto')?.value;
    if (precioNeto && precioNeto > 0) {
      // Aplicar IVA del 21% como ejemplo
      const pvp = precioNeto * 1.21;
      this.productoForm.patchValue({ pvp: Math.round(pvp * 100) / 100 });
    }
  }
}
