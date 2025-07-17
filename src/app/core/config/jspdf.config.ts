// Configuración para jsPDF en Angular
import { jsPDF } from 'jspdf';

// Configurar fuentes personalizadas si es necesario
export const configurarJsPDF = () => {
  // Configurar fuentes por defecto
  const pdf = new jsPDF();
  
  // Agregar fuentes personalizadas si las tienes
  // pdf.addFont('ruta/a/fuente.ttf', 'NombreFuente', 'normal');
  
  return pdf;
};

// Configuración de estilos para PDF
export const estilosPDF = {
  colores: {
    primario: [79, 70, 229], // #4F46E5
    secundario: [107, 114, 128], // #6B7280
    exito: [39, 194, 108], // #27C26C
    texto: [17, 24, 39], // #111827
    fondo: [249, 250, 251] // #F9FAFB
  },
  fuentes: {
    titulo: 20,
    subtitulo: 16,
    normal: 12,
    pequeño: 10
  },
  márgenes: {
    izquierda: 20,
    derecha: 20,
    superior: 20,
    inferior: 20
  }
};

// Función helper para aplicar estilos
export const aplicarEstilosPDF = (pdf: jsPDF, tipo: 'titulo' | 'subtitulo' | 'normal' | 'pequeño' = 'normal') => {
  pdf.setFont('helvetica');
  pdf.setFontSize(estilosPDF.fuentes[tipo]);
  
  if (tipo === 'titulo') {
    pdf.setTextColor(estilosPDF.colores.primario[0], estilosPDF.colores.primario[1], estilosPDF.colores.primario[2]);
  } else {
    pdf.setTextColor(estilosPDF.colores.texto[0], estilosPDF.colores.texto[1], estilosPDF.colores.texto[2]);
  }
};

// Función helper para dibujar líneas
export const dibujarLinea = (pdf: jsPDF, x1: number, y1: number, x2: number, y2: number) => {
  pdf.setDrawColor(estilosPDF.colores.secundario[0], estilosPDF.colores.secundario[1], estilosPDF.colores.secundario[2]);
  pdf.line(x1, y1, x2, y2);
}; 