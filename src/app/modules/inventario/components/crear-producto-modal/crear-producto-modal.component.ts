import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline, saveOutline, informationCircleOutline } from 'ionicons/icons';
import { ViewportService } from 'src/app/core/services/viewport.service';
import { InventarioService } from '../../services/inventario.service';
import { Inventario } from '../../models/inventario.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IonHeader, IonToolbar, IonContent, IonFooter, IonIcon, IonModal, ModalController } from '@ionic/angular/standalone';
import { ConfiguracionService } from '../../../../core/services/configuracion.service';

@Component({
  selector: 'app-crear-producto-modal',
  templateUrl: './crear-producto-modal.component.html',
  styleUrls: ['./crear-producto-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonContent, IonFooter, IonModal]
})
export class CrearProductoModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() productoParaEditar?: Inventario;
  
  productoForm: FormGroup;
  codigoGenerado: string = '';
  modoEdicion = false;
  tituloModal = 'Añadir producto';
  subtituloModal = 'Añade un nuevo producto a tu inventario';

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private viewportService: ViewportService,
    private elementRef: ElementRef,
    private inventarioService: InventarioService,
    private configuracionService: ConfiguracionService
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
    addIcons({ closeOutline, saveOutline, informationCircleOutline });
    
    // Verificar si estamos en modo edición
    if (this.productoParaEditar) {
      this.modoEdicion = true;
      this.tituloModal = 'Editar producto';
      this.subtituloModal = 'Modifica los datos del producto seleccionado';
      this.cargarDatosProducto();
    } else {
      this.generarCodigo();
    }
  }

  ngAfterViewInit() {
    // Ya no necesitamos aplicar safe areas manualmente
    // Ionic las maneja automáticamente con ion-header e ion-footer
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarDatosProducto() {
    if (this.productoParaEditar) {
      this.productoForm.patchValue({
        codigo: this.productoParaEditar.codigo,
        nombre: this.productoParaEditar.nombre,
        descripcion: this.productoParaEditar.descripcion || '',
        stock: this.productoParaEditar.cantidad_disponible,
        unidad: this.productoParaEditar.unidad,
        precioNeto: this.productoParaEditar.precio_neto,
        pvp: this.productoParaEditar.pvp
      });
    }
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

      // Si estamos en modo edición, incluir el ID del producto
      if (this.modoEdicion && this.productoParaEditar) {
        formData.id = this.productoParaEditar.id;
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
      // Obtener IVA de la configuración
      this.configuracionService.getIvaPorDefecto().pipe(
        takeUntil(this.destroy$)
      ).subscribe(ivaPorcentaje => {
        const pvp = precioNeto * (1 + ivaPorcentaje / 100);
        this.productoForm.patchValue({ pvp: Math.round(pvp * 100) / 100 });
      });
    }
  }
}
