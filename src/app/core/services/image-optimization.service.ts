import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageOptimizationService {

  /**
   * Optimiza una imagen antes de subirla
   */
  async optimizeImage(file: File, maxWidth: number = 1920, maxHeight: number = 1080, quality: number = 0.8): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calcular nuevas dimensiones manteniendo aspect ratio
        const { width, height } = this.calculateDimensions(img.width, img.height, maxWidth, maxHeight);
        
        canvas.width = width;
        canvas.height = height;
        
        // Dibujar imagen redimensionada
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convertir a blob con calidad optimizada
        canvas.toBlob((blob) => {
          if (blob) {
            const optimizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(optimizedFile);
          } else {
            reject(new Error('Error al optimizar imagen'));
          }
        }, file.type, quality);
      };

      img.onerror = () => reject(new Error('Error al cargar imagen'));
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Calcula las dimensiones optimizadas manteniendo aspect ratio
   */
  private calculateDimensions(width: number, height: number, maxWidth: number, maxHeight: number): { width: number; height: number } {
    if (width <= maxWidth && height <= maxHeight) {
      return { width, height };
    }

    const ratio = Math.min(maxWidth / width, maxHeight / height);
    return {
      width: Math.round(width * ratio),
      height: Math.round(height * ratio)
    };
  }

  /**
   * Comprime múltiples imágenes
   */
  async optimizeMultipleImages(files: File[]): Promise<File[]> {
    const optimizedFiles: File[] = [];
    
    for (const file of files) {
      try {
        const optimized = await this.optimizeImage(file);
        optimizedFiles.push(optimized);
      } catch (error) {
        console.warn('Error optimizando imagen:', error);
        optimizedFiles.push(file); // Usar original si falla optimización
      }
    }
    
    return optimizedFiles;
  }

  /**
   * Verifica si una imagen necesita optimización
   */
  needsOptimization(file: File, maxSizeMB: number = 2): boolean {
    return file.size > maxSizeMB * 1024 * 1024;
  }
} 