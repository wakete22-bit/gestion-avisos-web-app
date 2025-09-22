import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicDownloadService {
  private readonly DOWNLOAD_BASE_URL = 'https://gestion-avisos-web-app.vercel.app/descarga-publica'; // URL de la página de descarga

  /**
   * Crea un enlace de descarga público para un PDF
   */
  async crearEnlaceDescargaPublico(pdfBlob: Blob, nombreArchivo: string): Promise<string> {
    try {
      // Opción 1: Crear enlace con parámetros de consulta (recomendado)
      const enlaceConParametros = await this.crearEnlaceConParametros(pdfBlob, nombreArchivo);
      return enlaceConParametros;

    } catch (error) {
      console.error('❌ Error al crear enlace público:', error);
      
      // Opción 2: Fallback - usar data URL directo
      return await this.crearEnlaceDirecto(pdfBlob, nombreArchivo);
    }
  }

  /**
   * Crea un enlace de descarga con parámetros de consulta
   * El PDF se pasa como base64 en la URL
   */
  async crearEnlaceConParametros(pdfBlob: Blob, nombreArchivo: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const base64 = (reader.result as string).split(',')[1];
          const facturaId = this.extraerIdFactura(nombreArchivo);
          const url = `${this.DOWNLOAD_BASE_URL}?factura=${facturaId}&file=${encodeURIComponent(base64)}&name=${encodeURIComponent(nombreArchivo)}`;
          console.log('📄 Enlace público creado:', url);
          resolve(url);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(pdfBlob);
    });
  }

  /**
   * Genera un enlace de descarga directo usando data URL
   */
  async crearEnlaceDirecto(pdfBlob: Blob, nombreArchivo: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        console.log('📄 Enlace directo creado:', dataUrl.substring(0, 100) + '...');
        resolve(dataUrl);
      };
      reader.onerror = reject;
      reader.readAsDataURL(pdfBlob);
    });
  }

  /**
   * Extrae el ID de la factura del nombre del archivo
   */
  private extraerIdFactura(nombreArchivo: string): string {
    // Extraer el número de factura del nombre del archivo
    // Ejemplo: "factura_F2025-175.pdf" -> "F2025-175"
    const match = nombreArchivo.match(/factura_(.+)\.pdf$/);
    return match ? match[1] : nombreArchivo.replace('.pdf', '');
  }

  /**
   * Crea un enlace temporal local (solo funciona en la misma sesión)
   */
  crearEnlaceTemporalLocal(pdfBlob: Blob, nombreArchivo: string): string {
    const url = URL.createObjectURL(pdfBlob);
    console.log('📄 Enlace temporal local creado:', url);
    return url;
  }

  /**
   * Valida si un enlace es válido
   */
  esEnlaceValido(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Obtiene el tipo de enlace
   */
  obtenerTipoEnlace(url: string): 'publico' | 'directo' | 'temporal' | 'invalido' {
    if (!this.esEnlaceValido(url)) return 'invalido';
    if (url.startsWith('data:')) return 'directo';
    if (url.includes('/descarga-publica')) return 'publico';
    if (url.startsWith('blob:')) return 'temporal';
    return 'invalido';
  }
}
