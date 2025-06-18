import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from "@ionic/angular/standalone";
import { IonIcon } from '@ionic/angular/standalone';

import { trash, closeOutline, trashOutline, arrowBackOutline, sendOutline, download, print } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { 
  eyeOutline, 
  downloadOutline, 
  printOutline, 
  createOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.scss'],
  standalone: true,
    imports: [IonContent, CommonModule, ReactiveFormsModule, FormsModule, IonIcon]
})
export class CrearFacturaComponent implements OnInit {
  facturaForm: FormGroup;
  repuestos: any[] = [];
  manoObra: any[] = [];
  desplazamientos: any[] = [];
  mostrarVistaPrevia: boolean = false;

  constructor(private fb: FormBuilder) {
    this.facturaForm = this.fb.group({
      numeroFactura: ['', Validators.required],
      fecha: [new Date().toISOString().split('T')[0], Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      cif: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      notas: ['']
    });
    addIcons({trash,download,print,eyeOutline,downloadOutline,printOutline,trashOutline,createOutline});
  }

  ngOnInit() {
    addIcons({ trash, closeOutline, download, print });
  } 

  // Repuestos
  agregarRepuesto() {
    this.repuestos.push({ nombre: '', cantidad: 1, neto: 0, pvp: 0 });
  }
  eliminarRepuesto(i: number) {
    this.repuestos.splice(i, 1);
  }

  // Mano de obra
  agregarManoObra() {
    this.manoObra.push({ nombre: '', cantidad: 1, pvp: 0 });
  }
  eliminarManoObra(i: number) {
    this.manoObra.splice(i, 1);
  }

  // Desplazamiento
  agregarDesplazamiento() {
    this.desplazamientos.push({ nombre: '', cantidad: 1, pvp: 0 });
  }
  eliminarDesplazamiento(i: number) {
    this.desplazamientos.splice(i, 1);
  }

  // Totales
  get totalRepuestosNeto() {
    return this.repuestos.reduce((acc, r) => acc + (r.cantidad * r.neto), 0);
  }
  get totalRepuestosPvp() {
    return this.repuestos.reduce((acc, r) => acc + (r.cantidad * r.pvp), 0);
  }
  get totalManoObra() {
    return this.manoObra.reduce((acc, m) => acc + (m.cantidad * m.pvp), 0);
  }
  get totalDesplazamiento() {
    return this.desplazamientos.reduce((acc, d) => acc + (d.cantidad * d.pvp), 0);
  }
  get subtotal() {
    return this.totalRepuestosPvp + this.totalManoObra + this.totalDesplazamiento;
  }
  get iva() {
    return +(this.subtotal * 0.21).toFixed(2);
  }
  get total() {
    return +(this.subtotal + this.iva).toFixed(2);
  }

  enviarFactura() {
    // lógica para enviar factura
  }
  generarFactura() {
    // lógica para generar factura
  }

  toggleVistaPrevia() {
    this.mostrarVistaPrevia = !this.mostrarVistaPrevia;
  }
}
