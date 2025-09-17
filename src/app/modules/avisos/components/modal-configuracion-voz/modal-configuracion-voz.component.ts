import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, volumeHighOutline, speedometerOutline, musicalNotesOutline, playOutline, pauseOutline, stopOutline, personOutline } from 'ionicons/icons';
import { MapboxNavigationService } from '../../../../core/services/mapbox-navigation.service';

@Component({
  selector: 'app-modal-configuracion-voz',
  templateUrl: './modal-configuracion-voz.component.html',
  styleUrls: ['./modal-configuracion-voz.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonIcon
  ]
})
export class ModalConfiguracionVozComponent implements OnInit {
  // Configuración de voz
  voiceEnabled = true;
  volume = 0.8;
  rate = 0.9;
  pitch = 1.0;
  selectedVoice: SpeechSynthesisVoice | null = null;
  
  // Voces disponibles
  availableVoices: SpeechSynthesisVoice[] = [];
  
  // Estado de reproducción
  isPlaying = false;
  testText = 'Gire a la derecha en 200 metros. Continúe por la calle principal.';

  constructor(
    private modalController: ModalController,
    private mapboxService: MapboxNavigationService
  ) {
    addIcons({closeOutline,volumeHighOutline,speedometerOutline,musicalNotesOutline,personOutline,stopOutline,playOutline,pauseOutline});
  }

  ngOnInit() {
    this.loadVoiceSettings();
    this.loadAvailableVoices();
  }

  /**
   * Carga la configuración actual de voz
   */
  private loadVoiceSettings() {
    const settings = this.mapboxService.getVoiceSettings();
    this.voiceEnabled = settings.enabled;
    this.volume = settings.volume;
    this.rate = settings.rate;
    this.pitch = settings.pitch;
    
    // Buscar la voz actual
    const voices = this.mapboxService.getAvailableVoices();
    if (voices.length > 0) {
      this.selectedVoice = voices.find(v => v.name === settings.voice) || voices[0] || null;
    }
    
    // Si no hay voz seleccionada, esperar a que se carguen las voces
    if (!this.selectedVoice && voices.length === 0) {
      setTimeout(() => {
        this.loadVoiceSettings();
      }, 1000);
    }
  }

  /**
   * Carga las voces disponibles
   */
  private loadAvailableVoices() {
    this.availableVoices = this.mapboxService.getAvailableVoices();
    
    // Si no hay voces cargadas, esperar un poco y reintentar
    if (this.availableVoices.length === 0) {
      setTimeout(() => {
        this.availableVoices = this.mapboxService.getAvailableVoices();
        // Recargar configuración si ahora hay voces
        if (this.availableVoices.length > 0) {
          this.loadVoiceSettings();
        }
      }, 1000);
    }
  }

  /**
   * Maneja el cambio de habilitación de voz
   */
  onVoiceEnabledChange() {
    this.mapboxService.setVoiceEnabled(this.voiceEnabled);
  }

  /**
   * Maneja el cambio de volumen
   */
  onVolumeChange(event: any) {
    this.volume = event.target.value / 100;
    this.mapboxService.setVoiceVolume(this.volume);
  }

  /**
   * Maneja el cambio de velocidad
   */
  onRateChange(event: any) {
    this.rate = event.target.value / 100;
    this.mapboxService.setVoiceRate(this.rate);
  }

  /**
   * Maneja el cambio de tono
   */
  onPitchChange(event: any) {
    this.pitch = event.target.value / 100;
    this.mapboxService.setVoicePitch(this.pitch);
  }

  /**
   * Maneja el cambio de voz
   */
  onVoiceChange(event: any) {
    const voice = event.target.value;
    
    if (voice) {
      this.selectedVoice = voice;
      this.mapboxService.setVoice(voice);
      console.log('🎤 Voz seleccionada:', voice.name, voice.lang);
    } else {
      console.log('🎤 Voz no encontrada');
    }
  }

  /**
   * Reproduce el texto de prueba
   */
  playTest() {
    if (this.isPlaying) {
      this.mapboxService.pauseVoice();
      this.isPlaying = false;
    } else {
      this.mapboxService.speakCustomInstruction(this.testText, {
        priority: 'high'
      });
      this.isPlaying = true;
      
      // Simular fin de reproducción
      setTimeout(() => {
        this.isPlaying = false;
      }, 3000);
    }
  }

  /**
   * Detiene la reproducción de prueba
   */
  stopTest() {
    this.mapboxService.stopVoice();
    this.isPlaying = false;
  }

  /**
   * Formatea el valor del rango para mostrar
   */
  formatRangeValue(value: number, type: 'volume' | 'rate' | 'pitch'): string {
    switch (type) {
      case 'volume':
        return `${Math.round(value * 100)}%`;
      case 'rate':
        return `${value.toFixed(1)}x`;
      case 'pitch':
        return `${value.toFixed(1)}`;
      default:
        return value.toString();
    }
  }

  /**
   * Obtiene el nombre de la voz para mostrar
   */
  getVoiceDisplayName(voice: SpeechSynthesisVoice): string {
    const lang = voice.lang.startsWith('es') ? '🇪🇸' : '🌍';
    return `${lang} ${voice.name} (${voice.lang})`;
  }

  /**
   * Cierra el modal
   */
  async cerrar() {
    await this.modalController.dismiss();
  }

  /**
   * Guarda la configuración y cierra
   */
  async guardar() {
    // La configuración ya se aplica en tiempo real
    await this.modalController.dismiss({
      saved: true,
      settings: {
        enabled: this.voiceEnabled,
        volume: this.volume,
        rate: this.rate,
        pitch: this.pitch,
        voice: this.selectedVoice?.name
      }
    });
  }
}
