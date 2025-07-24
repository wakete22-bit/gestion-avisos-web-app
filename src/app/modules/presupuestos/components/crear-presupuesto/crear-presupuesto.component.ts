import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, saveOutline, addCircleOutline, trashOutline } from 'ionicons/icons';

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
  aviso: any = null;
  loading = false;
  materiales: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private presupuestosService: PresupuestosService,
    private avisosService: AvisosService
  ) {
    addIcons({ arrowBackOutline, saveOutline, addCircleOutline, trashOutline });
    
    this.presupuestoForm = this.fb.group({
      horas_estimadas: [0, [Validators.required, Validators.min(0)]],
      total_estimado: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.avisoId = params['avisoId'];
      if (this.avisoId) {
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
      return total + (material.cantidad_estimada * material.precio_unitario_al_momento);
    }, 0);
    
    const totalEstimado = costoManoObra + costoMateriales;
    this.presupuestoForm.patchValue({ total_estimado: totalEstimado });
  }

  guardarPresupuesto() {
    if (!this.presupuestoForm.valid || !this.avisoId) {
      return;
    }

    this.loading = true;
    const presupuestoData: CrearPresupuestoRequest = {
      aviso_id: this.avisoId,
      horas_estimadas: this.presupuestoForm.get('horas_estimadas')?.value,
      total_estimado: this.presupuestoForm.get('total_estimado')?.value,
      materiales: this.materiales
    };

    this.presupuestosService.crearPresupuesto(presupuestoData).subscribe({
      next: (presupuesto) => {
        this.loading = false;
        this.router.navigate(['/presupuestos']);
      },
      error: (error) => {
        console.error('Error al crear presupuesto:', error);
        this.loading = false;
      }
    });
  }

  volver() {
    this.router.navigate(['/presupuestos']);
  }
} 