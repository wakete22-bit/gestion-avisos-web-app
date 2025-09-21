import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, downloadOutline, trashOutline, chevronBackOutline, chevronForwardOutline, refreshOutline } from 'ionicons/icons';

addIcons({ close, downloadOutline, trashOutline, chevronBackOutline, chevronForwardOutline, refreshOutline });

@Component({
  selector: 'app-ver-imagen-modal',
  templateUrl: './ver-imagen-modal.component.html',
  styleUrls: ['./ver-imagen-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon],
})
export class VerImagenModalComponent {
  @Input() imagen: { id: string; url: string; descripcion?: string } | null = null;
  
  // Variables para el zoom
  zoomLevel = 1;
  minZoom = 0.5;
  maxZoom = 3;
  isDragging = false;
  startX = 0;
  startY = 0;
  translateX = 0;
  translateY = 0;

  constructor(private modalController: ModalController) {
      addIcons({refreshOutline,downloadOutline,trashOutline,close});}

  /**
   * Cierra el modal
   */
  cerrarModal() {
    this.modalController.dismiss();
  }

  /**
   * Descarga la imagen
   */
  descargarImagen() {
    if (!this.imagen?.url) return;

    const link = document.createElement('a');
    link.href = this.imagen.url;
    link.download = this.imagen.descripcion || `imagen-${this.imagen.id}`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Elimina la imagen (solo si se pasa la función desde el componente padre)
   */
  eliminarImagen() {
    if (confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      this.modalController.dismiss({ accion: 'eliminar', imagen: this.imagen });
    }
  }

  /**
   * Maneja el zoom con la rueda del mouse
   */
  onWheel(event: WheelEvent) {
    event.preventDefault();
    
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoomLevel + delta));
    
    if (newZoom !== this.zoomLevel) {
      this.zoomLevel = newZoom;
      
      // Si el zoom es 1, centrar la imagen
      if (this.zoomLevel === 1) {
        this.translateX = 0;
        this.translateY = 0;
      }
    }
  }

  /**
   * Inicia el arrastre de la imagen
   */
  onMouseDown(event: MouseEvent) {
    if (this.zoomLevel > 1) {
      this.isDragging = true;
      this.startX = event.clientX - this.translateX;
      this.startY = event.clientY - this.translateY;
      event.preventDefault();
    }
  }

  /**
   * Maneja el movimiento durante el arrastre
   */
  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.zoomLevel > 1) {
      this.translateX = event.clientX - this.startX;
      this.translateY = event.clientY - this.startY;
    }
  }

  /**
   * Termina el arrastre
   */
  onMouseUp() {
    this.isDragging = false;
  }

  /**
   * Maneja el zoom con gestos táctiles
   */
  onTouchStart(event: TouchEvent) {
    if (event.touches.length === 2) {
      event.preventDefault();
    }
  }

  onTouchMove(event: TouchEvent) {
    if (event.touches.length === 2) {
      event.preventDefault();
      
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      // Implementar zoom con pellizco (pinch)
      if (this.lastDistance && distance !== this.lastDistance) {
        const scale = distance / this.lastDistance;
        const newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoomLevel * scale));
        this.zoomLevel = newZoom;
      }
      
      this.lastDistance = distance;
    }
  }

  onTouchEnd() {
    this.lastDistance = 0;
  }

  private lastDistance = 0;

  /**
   * Resetea el zoom y la posición
   */
  resetZoom() {
    this.zoomLevel = 1;
    this.translateX = 0;
    this.translateY = 0;
  }

  /**
   * Obtiene los estilos de transformación para la imagen
   */
  getImageTransform() {
    return `scale(${this.zoomLevel}) translate(${this.translateX / this.zoomLevel}px, ${this.translateY / this.zoomLevel}px)`;
  }
}
