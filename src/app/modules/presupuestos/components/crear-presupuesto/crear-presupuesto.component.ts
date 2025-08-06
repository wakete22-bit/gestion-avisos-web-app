import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, saveOutline, addCircleOutline, trashOutline, refreshOutline } from 'ionicons/icons';

import { PresupuestosService } from '../../services/presupuestos.service';
import { AvisosService } from '../../../../core/services/avisos.service';
import { CrearPresupuestoRequest } from '../../services/presupuestos.service';

@Component({
  selector: 'app-crear-presupuesto',
  templateUrl: './crear-presupuesto.component.html',
  styleUrls: ['./crear-presupuesto.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonContent, IonIcon]
})
export class CrearPresupuestoComponent implements OnInit {
  presupuestoForm: FormGroup;
  avisoId: string | null = null;
  presupuestoId: string | null = null;
  aviso: any = null;
  presupuesto: any = null;
  loading = false;
  materiales: any[] = [];
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private presupuestosService: PresupuestosService,
    private avisosService: AvisosService
  ) {
    addIcons({arrowBackOutline,refreshOutline,addCircleOutline,trashOutline,saveOutline});
    
    this.presupuestoForm = this.fb.group({
      horas_estimadas: [0, [Validators.required, Validators.min(0)]],
      total_estimado: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.avisoId = params['avisoId'];
      this.presupuestoId = params['id'];
      this.modoEdicion = params['edit'] === 'true';
      
      console.log('Modo edición:', this.modoEdicion);
      console.log('ID presupuesto:', this.presupuestoId);
      console.log('ID aviso:', this.avisoId);
      
      if (this.modoEdicion && this.presupuestoId) {
        this.cargarPresupuestoParaEditar();
      } else if (this.avisoId) {
        this.cargarAviso();
      }
    });
  }

  cargarAviso() {
    if (!this.avisoId) return;
    
    this.avisosService.getAviso(this.avisoId).subscribe({
      next: (aviso) => {
        this.aviso = aviso;
      },
      error: (error) => {
        console.error('Error al cargar aviso:', error);
      }
    });
  }

  cargarPresupuestoParaEditar() {
    if (!this.presupuestoId) return;
    
    this.loading = true;
    this.presupuestosService.getPresupuesto(this.presupuestoId).subscribe({
      next: (presupuesto) => {
        console.log('Presupuesto cargado para editar:', presupuesto);
        this.presupuesto = presupuesto;
        this.aviso = presupuesto.aviso;
        this.avisoId = presupuesto.aviso_id;
        
        // Cargar datos del formulario
        console.log('Datos del presupuesto cargado:', {
          horas_estimadas: presupuesto.horas_estimadas,
          total_estimado: presupuesto.total_estimado,
          materiales: presupuesto.materiales
        });
        
        this.presupuestoForm.patchValue({
          horas_estimadas: Number(presupuesto.horas_estimadas) || 0,
          total_estimado: Number(presupuesto.total_estimado) || 0
        });
        
        // Cargar materiales
        if (presupuesto.materiales && presupuesto.materiales.length > 0) {
          this.materiales = presupuesto.materiales.map((material: any) => ({
            material_id: material.material_id,
            cantidad_estimada: Number(material.cantidad_estimada) || 0,
            precio_unitario_al_momento: Number(material.precio_unitario_al_momento) || 0
          }));
        }
        
        // Recalcular el total después de cargar todos los datos
        setTimeout(() => {
          this.calcularTotal();
          
          // Verificar el estado final del formulario
          console.log('Estado final del formulario:', {
            horas_estimadas: this.presupuestoForm.get('horas_estimadas')?.value,
            total_estimado: this.presupuestoForm.get('total_estimado')?.value,
            materiales: this.materiales
          });
        }, 100);
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar presupuesto para editar:', error);
        this.loading = false;
      }
    });
  }

  agregarMaterial() {
    this.materiales.push({
      material_id: '',
      cantidad_estimada: 1,
      precio_unitario_al_momento: 0
    });
  }

  eliminarMaterial(index: number) {
    this.materiales.splice(index, 1);
  }

  calcularTotal() {
    const horasEstimadas = this.presupuestoForm.get('horas_estimadas')?.value || 0;
    const precioPorHora = 50; // Esto debería venir de configuración
    const costoManoObra = horasEstimadas * precioPorHora;
    
    const costoMateriales = this.materiales.reduce((total, material) => {
      const cantidad = material.cantidad_estimada || 0;
      const precio = material.precio_unitario_al_momento || 0;
      return total + (cantidad * precio);
    }, 0);
    
    const totalEstimado = costoManoObra + costoMateriales;
    console.log('Calculando total:', {
      horasEstimadas,
      precioPorHora,
      costoManoObra,
      costoMateriales,
      totalEstimado
    });
    
    this.presupuestoForm.patchValue({ total_estimado: totalEstimado });
  }

  guardarPresupuesto() {
    if (!this.presupuestoForm.valid || !this.avisoId) {
      return;
    }

    this.loading = true;
    
    if (this.modoEdicion && this.presupuestoId) {
      // Modo edición - actualizar presupuesto existente
      const presupuestoData = {
        horas_estimadas: this.presupuestoForm.get('horas_estimadas')?.value,
        total_estimado: this.presupuestoForm.get('total_estimado')?.value
      };

      this.presupuestosService.actualizarPresupuesto(this.presupuestoId, presupuestoData).subscribe({
        next: (presupuesto) => {
          console.log('Presupuesto actualizado:', presupuesto);
          this.loading = false;
          this.router.navigate(['/presupuestos']);
        },
        error: (error) => {
          console.error('Error al actualizar presupuesto:', error);
          this.loading = false;
        }
      });
    } else {
      // Modo creación - crear nuevo presupuesto
      const presupuestoData: CrearPresupuestoRequest = {
        aviso_id: this.avisoId,
        horas_estimadas: this.presupuestoForm.get('horas_estimadas')?.value,
        total_estimado: this.presupuestoForm.get('total_estimado')?.value,
        materiales: this.materiales
      };

      this.presupuestosService.crearPresupuesto(presupuestoData).subscribe({
        next: (presupuesto) => {
          console.log('Presupuesto creado:', presupuesto);
          this.loading = false;
          this.router.navigate(['/presupuestos']);
        },
        error: (error) => {
          console.error('Error al crear presupuesto:', error);
          this.loading = false;
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/presupuestos']);
  }
} 