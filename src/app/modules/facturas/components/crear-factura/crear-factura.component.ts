import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from "@ionic/angular/standalone";
import { IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { trash, closeOutline, trashOutline, arrowBackOutline, sendOutline, download, print } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { 
  eyeOutline, 
  downloadOutline, 
  printOutline, 
  createOutline
} from 'ionicons/icons';
import { FacturasService } from '../../services/facturas.service';
import { LineaFactura, CrearFacturaRequest } from '../../models/factura.model';
import { PdfService } from '../../../../core/services/pdf.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.scss'],
  standalone: true,
    imports: [IonContent, CommonModule, ReactiveFormsModule, FormsModule, IonIcon]
})
export class CrearFacturaComponent implements OnInit {
  facturaForm: FormGroup;
  repuestos: LineaFactura[] = [];
  manoObra: LineaFactura[] = [];
  desplazamientos: LineaFactura[] = [];
  mostrarVistaPrevia: boolean = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private facturasService: FacturasService,
    private router: Router,
    private pdfService: PdfService
  ) {
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
    this.generarNumeroFactura();
    
    // Agregar algunos datos de ejemplo para mostrar la funcionalidad
    this.agregarDatosEjemplo();
  }

  private agregarDatosEjemplo() {
    // Llenar formulario con datos de ejemplo
    this.facturaForm.patchValue({
      nombre: 'Restaurante El Sol',
      direccion: 'Calle Mayor 123, Madrid',
      cif: 'B12345678',
      email: 'info@restauranteelsol.com',
      notas: 'Mantenimiento preventivo de equipos de climatización'
    });

    // Agregar un repuesto de ejemplo
    this.repuestos.push({
      tipo: 'repuesto',
      nombre: 'Válvula de expansión',
      cantidad: 1,
      precio_neto: 25.00,
      precio_pvp: 35.00
    });

    // Agregar mano de obra de ejemplo
    this.manoObra.push({
      tipo: 'mano_obra',
      nombre: 'Mano de obra Técnico',
      cantidad: 2.25,
      precio_pvp: 45.00
    });

    // Agregar desplazamiento de ejemplo
    this.desplazamientos.push({
      tipo: 'desplazamiento',
      nombre: 'Kilometraje',
      cantidad: 10,
      precio_pvp: 3.50
    });
  } 

  // Generar número de factura automáticamente
  generarNumeroFactura() {
    this.facturasService.getSiguienteNumero().subscribe({
      next: (numero) => {
        this.facturaForm.patchValue({ numeroFactura: numero });
      },
      error: (error) => {
        console.error('Error al generar número de factura:', error);
        // Fallback: generar número manual
        const año = new Date().getFullYear();
        this.facturaForm.patchValue({ numeroFactura: `F${año}-001` });
      }
    });
  }

  // Repuestos
  agregarRepuesto() {
    this.repuestos.push({ 
      tipo: 'repuesto',
      nombre: '', 
      cantidad: 1, 
      precio_neto: 0, 
      precio_pvp: 0 
    });
  }
  eliminarRepuesto(i: number) {
    this.repuestos.splice(i, 1);
  }

  // Mano de obra
  agregarManoObra() {
    this.manoObra.push({ 
      tipo: 'mano_obra',
      nombre: '', 
      cantidad: 1, 
      precio_pvp: 0 
    });
  }
  eliminarManoObra(i: number) {
    this.manoObra.splice(i, 1);
  }

  // Desplazamiento
  agregarDesplazamiento() {
    this.desplazamientos.push({ 
      tipo: 'desplazamiento',
      nombre: '', 
      cantidad: 1, 
      precio_pvp: 0 
    });
  }
  eliminarDesplazamiento(i: number) {
    this.desplazamientos.splice(i, 1);
  }

  // Totales
  get totalRepuestosNeto() {
    return this.repuestos.reduce((acc, r) => acc + (r.cantidad * (r.precio_neto || 0)), 0);
  }
  get totalRepuestosPvp() {
    return this.repuestos.reduce((acc, r) => acc + (r.cantidad * r.precio_pvp), 0);
  }
  get totalManoObra() {
    return this.manoObra.reduce((acc, m) => acc + (m.cantidad * m.precio_pvp), 0);
  }
  get totalDesplazamiento() {
    return this.desplazamientos.reduce((acc, d) => acc + (d.cantidad * d.precio_pvp), 0);
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
    console.log('Botón enviar factura clickeado');
    console.log('Formulario válido:', this.facturaForm.valid);
    console.log('Errores del formulario:', this.facturaForm.errors);
    console.log('Valores del formulario:', this.facturaForm.value);
    
    if (this.facturaForm.valid) {
      console.log('Formulario es válido, procediendo...');
      this.loading = true;
      const facturaData = this.prepararDatosFactura();
      facturaData.estado = 'En curso';
      
      console.log('Datos de factura a enviar:', facturaData);
      
      this.facturasService.crearFactura(facturaData).subscribe({
        next: (response) => {
          console.log('Factura creada exitosamente:', response);
          this.loading = false;
          // Aquí podrías mostrar un mensaje de éxito
          this.router.navigate(['/facturas']);
        },
        error: (error) => {
          console.error('Error al crear factura:', error);
          this.loading = false;
          // Aquí podrías mostrar un mensaje de error
        }
      });
    } else {
      console.log('Formulario no es válido');
      // Mostrar errores específicos
      Object.keys(this.facturaForm.controls).forEach(key => {
        const control = this.facturaForm.get(key);
        if (control?.invalid) {
          console.log(`Campo ${key} es inválido:`, control.errors);
        }
      });
    }
  }

  generarFactura() {
    console.log('Botón generar factura clickeado');
    console.log('Formulario válido:', this.facturaForm.valid);
    
    if (this.facturaForm.valid) {
      console.log('Formulario es válido, procediendo...');
      this.loading = true;
      const facturaData = this.prepararDatosFactura();
      facturaData.estado = 'Pendiente';
      
      console.log('Datos de factura a generar:', facturaData);
      
      this.facturasService.crearFactura(facturaData).subscribe({
        next: (response) => {
          console.log('Factura generada exitosamente:', response);
          this.loading = false;
          // Aquí podrías mostrar un mensaje de éxito
          this.router.navigate(['/facturas']);
        },
        error: (error) => {
          console.error('Error al generar factura:', error);
          this.loading = false;
          // Aquí podrías mostrar un mensaje de error
        }
      });
    } else {
      console.log('Formulario no es válido');
      // Mostrar errores específicos
      Object.keys(this.facturaForm.controls).forEach(key => {
        const control = this.facturaForm.get(key);
        if (control?.invalid) {
          console.log(`Campo ${key} es inválido:`, control.errors);
        }
      });
    }
  }

  private prepararDatosFactura(): CrearFacturaRequest {
    const formValue = this.facturaForm.value;
    const todasLasLineas = [
      ...this.repuestos,
      ...this.manoObra,
      ...this.desplazamientos
    ];

    return {
      numero_factura: formValue.numeroFactura,
      fecha_emision: formValue.fecha,
      nombre_cliente: formValue.nombre,
      direccion_cliente: formValue.direccion,
      cif_cliente: formValue.cif,
      email_cliente: formValue.email,
      subtotal: this.subtotal,
      iva: this.iva,
      total: this.total,
      estado: 'Pendiente',
      notas: formValue.notas,
      lineas: todasLasLineas
    };
  }

  toggleVistaPrevia() {
    this.mostrarVistaPrevia = !this.mostrarVistaPrevia;
  }

  // Método para debug del formulario
  debugFormulario() {
    console.log('=== DEBUG FORMULARIO ===');
    console.log('Formulario válido:', this.facturaForm.valid);
    console.log('Valores:', this.facturaForm.value);
    console.log('Errores:', this.facturaForm.errors);
    
    Object.keys(this.facturaForm.controls).forEach(key => {
      const control = this.facturaForm.get(key);
      console.log(`Campo ${key}:`, {
        valor: control?.value,
        válido: control?.valid,
        errores: control?.errors,
        touched: control?.touched,
        dirty: control?.dirty
      });
    });
  }

  // Método para descargar factura como PDF
  async descargarFactura() {
    try {
      console.log('🔧 Iniciando descarga de factura...');
      
      // Generar nombre del archivo
      const numeroFactura = this.facturaForm.get('numeroFactura')?.value || 'factura';
      const nombreArchivo = `factura_${numeroFactura}.pdf`;

      // Obtener datos de la factura
      const datosFactura = this.prepararDatosFactura();

      // Generar PDF nativo con estilos
      this.pdfService.generarPdfNativo(datosFactura, nombreArchivo);
      
      console.log('✅ Factura descargada exitosamente');
    } catch (error) {
      console.error('❌ Error al descargar factura:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }

  // Método para imprimir factura
  async imprimirFactura() {
    try {
      console.log('🔧 Iniciando impresión de factura...');
      
      // Obtener datos de la factura
      const datosFactura = this.prepararDatosFactura();

      // Usar el método de impresión nativa
      await this.pdfService.imprimirFacturaNativa(datosFactura);
      
      console.log('✅ Impresión iniciada exitosamente');
    } catch (error) {
      console.error('❌ Error al imprimir factura:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }

  // Método para generar PDF desde datos (alternativo)
  generarPdfDesdeDatos() {
    try {
      console.log('🔧 Generando PDF desde datos...');
      
      const datosFactura = this.prepararDatosFactura();
      const numeroFactura = this.facturaForm.get('numeroFactura')?.value || 'factura';
      const nombreArchivo = `factura_${numeroFactura}.pdf`;

      // Usar el nuevo método nativo en lugar del básico
      this.pdfService.generarPdfNativo(datosFactura, nombreArchivo);
      
      console.log('✅ PDF desde datos generado exitosamente');
    } catch (error) {
      console.error('❌ Error al generar PDF desde datos:', error);
    }
  }
}
