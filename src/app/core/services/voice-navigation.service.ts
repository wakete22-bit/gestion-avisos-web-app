import { Injectable } from '@angular/core';

export interface VoiceInstruction {
  text: string;
  distance?: number;
  maneuver?: string;
  priority?: 'high' | 'medium' | 'low';
}

@Injectable({
  providedIn: 'root'
})
export class VoiceNavigationService {
  private speechSynthesis: SpeechSynthesis;
  private isEnabled = true;
  private isSpeaking = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voice: SpeechSynthesisVoice | null = null;
  private volume = 0.8;
  private rate = 0.9;
  private pitch = 1.0;

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
    this.loadSavedVoice();
    this.initializeVoice();
  }

  /**
   * Carga la voz guardada desde localStorage
   */
  private loadSavedVoice() {
    try {
      const savedVoice = localStorage.getItem('selectedVoice');
      if (savedVoice) {
        const voiceData = JSON.parse(savedVoice);
        console.log('🎤 Cargando voz guardada:', voiceData.name);
        // La voz se aplicará cuando estén disponibles
      }
    } catch (error) {
      console.log('🎤 No se pudo cargar voz guardada:', error);
    }
  }

  /**
   * Inicializa la voz y configura las preferencias
   */
  private initializeVoice() {
    // Esperar a que las voces estén cargadas
    if (this.speechSynthesis.getVoices().length === 0) {
      this.speechSynthesis.addEventListener('voiceschanged', () => {
        this.selectBestVoice();
        this.applySavedVoice();
      });
    } else {
      this.selectBestVoice();
      this.applySavedVoice();
    }
  }

  /**
   * Aplica la voz guardada si está disponible
   */
  private applySavedVoice() {
    try {
      const savedVoice = localStorage.getItem('selectedVoice');
      if (savedVoice) {
        const voiceData = JSON.parse(savedVoice);
        const voices = this.speechSynthesis.getVoices();
        
        // Buscar la voz guardada por nombre y URI
        const foundVoice = voices.find(voice => 
          voice.name === voiceData.name && voice.voiceURI === voiceData.voiceURI
        );
        
        if (foundVoice) {
          this.voice = foundVoice;
          console.log('🎤 Voz guardada aplicada:', foundVoice.name);
        } else {
          // Si no se encuentra, seleccionar la mejor voz en español
          this.selectBestVoice();
        }
      }
    } catch (error) {
      console.log('🎤 Error aplicando voz guardada:', error);
      this.selectBestVoice();
    }
  }

  /**
   * Selecciona la mejor voz disponible (preferiblemente en español)
   */
  private selectBestVoice() {
    const voices = this.speechSynthesis.getVoices();
    
    // Buscar voz en español con prioridad específica
    let spanishVoice = voices.find(voice => 
      voice.lang.startsWith('es') && 
      (voice.name.includes('Google') || voice.name.includes('Microsoft'))
    );
    
    // Si no encuentra Google/Microsoft, buscar cualquier voz en español
    if (!spanishVoice) {
      spanishVoice = voices.find(voice => 
        voice.lang.startsWith('es')
      );
    }
    
    // Si encuentra voz en español, usarla
    if (spanishVoice) {
      this.voice = spanishVoice;
      console.log('🎤 Voz en español seleccionada:', spanishVoice.name, spanishVoice.lang);
      
      // Guardar la selección en localStorage
      localStorage.setItem('selectedVoice', JSON.stringify({
        name: spanishVoice.name,
        lang: spanishVoice.lang,
        voiceURI: spanishVoice.voiceURI
      }));
    } else {
      // Fallback a la voz por defecto
      this.voice = voices[0] || null;
      console.log('🎤 Usando voz por defecto:', this.voice?.name);
    }
  }

  /**
   * Habilita o deshabilita las notificaciones de voz
   */
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled && this.isSpeaking) {
      this.stopSpeaking();
    }
    console.log('🎤 Notificaciones de voz:', enabled ? 'Habilitadas' : 'Deshabilitadas');
  }

  /**
   * Verifica si las notificaciones de voz están habilitadas
   */
  isVoiceEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Configura el volumen de la voz (0.0 - 1.0)
   */
  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Configura la velocidad de la voz (0.1 - 10.0)
   */
  setRate(rate: number) {
    this.rate = Math.max(0.1, Math.min(10, rate));
  }

  /**
   * Configura el tono de la voz (0 - 2)
   */
  setPitch(pitch: number) {
    this.pitch = Math.max(0, Math.min(2, pitch));
  }

  /**
   * Reproduce una instrucción de navegación por voz
   */
  speak(instruction: VoiceInstruction) {
    if (!this.isEnabled || !this.speechSynthesis) {
      return;
    }

    // Detener cualquier instrucción anterior
    this.stopSpeaking();

    // Procesar el texto de la instrucción
    const processedText = this.processInstructionText(instruction);
    
    if (!processedText) {
      return;
    }

    console.log('🎤 Reproduciendo:', processedText);

    // Crear utterance
    this.currentUtterance = new SpeechSynthesisUtterance(processedText);
    
    // Configurar utterance
    if (this.voice) {
      this.currentUtterance.voice = this.voice;
    }
    this.currentUtterance.volume = this.volume;
    this.currentUtterance.rate = this.rate;
    this.currentUtterance.pitch = this.pitch;
    this.currentUtterance.lang = 'es-ES';

    // Eventos
    this.currentUtterance.onstart = () => {
      this.isSpeaking = true;
      console.log('🎤 Iniciando reproducción de voz');
    };

    this.currentUtterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      console.log('🎤 Reproducción de voz completada');
    };

    this.currentUtterance.onerror = (event) => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      console.error('🎤 Error en reproducción de voz:', event.error);
    };

    // Reproducir
    this.speechSynthesis.speak(this.currentUtterance);
  }

  /**
   * Procesa el texto de la instrucción para hacerlo más natural
   */
  private processInstructionText(instruction: VoiceInstruction): string {
    let text = instruction.text;

    // Limpiar texto de HTML y caracteres especiales
    text = text.replace(/<[^>]*>/g, '');
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&amp;/g, '&');
    text = text.replace(/&lt;/g, '<');
    text = text.replace(/&gt;/g, '>');

    // Agregar distancia si está disponible
    if (instruction.distance && instruction.distance > 0) {
      const distanceText = this.formatDistanceForVoice(instruction.distance);
      text = `${text}. En ${distanceText}`;
    }

    // Agregar contexto según la maniobra
    if (instruction.maneuver) {
      text = this.addManeuverContext(text, instruction.maneuver);
    }

    // Hacer el texto más natural para voz
    text = this.makeTextNatural(text);

    return text.trim();
  }

  /**
   * Formatea la distancia para voz
   */
  private formatDistanceForVoice(distance: number): string {
    if (distance < 1000) {
      return `${Math.round(distance)} metros`;
    } else {
      const km = (distance / 1000).toFixed(1);
      return `${km} kilómetros`;
    }
  }

  /**
   * Agrega contexto según el tipo de maniobra
   */
  private addManeuverContext(text: string, maneuver: string): string {
    const maneuverLower = maneuver.toLowerCase();
    
    if (maneuverLower.includes('turn') || maneuverLower.includes('girar')) {
      return `Gire ${text.toLowerCase()}`;
    } else if (maneuverLower.includes('continue') || maneuverLower.includes('continuar')) {
      return `Continúe ${text.toLowerCase()}`;
    } else if (maneuverLower.includes('arrive') || maneuverLower.includes('llegar')) {
      return `Ha llegado a ${text.toLowerCase()}`;
    } else if (maneuverLower.includes('depart') || maneuverLower.includes('salir')) {
      return `Salga ${text.toLowerCase()}`;
    }
    
    return text;
  }

  /**
   * Hace el texto más natural para reproducción de voz
   */
  private makeTextNatural(text: string): string {
    // Reemplazar abreviaciones comunes
    text = text.replace(/\bAve\./g, 'Avenida');
    text = text.replace(/\bC\./g, 'Calle');
    text = text.replace(/\bPza\./g, 'Plaza');
    text = text.replace(/\bAv\./g, 'Avenida');
    text = text.replace(/\bC\/\s/g, 'Calle ');
    text = text.replace(/\bNº\s/g, 'número ');
    text = text.replace(/\bKm\s/g, 'kilómetro ');
    text = text.replace(/\bkm\s/g, 'kilómetro ');

    // Reemplazar números con texto cuando sea apropiado
    text = text.replace(/\b1ª\b/g, 'primera');
    text = text.replace(/\b2ª\b/g, 'segunda');
    text = text.replace(/\b3ª\b/g, 'tercera');

    // Agregar pausas naturales
    text = text.replace(/\./g, '. ');
    text = text.replace(/,/g, ', ');

    return text;
  }

  /**
   * Detiene la reproducción actual
   */
  stopSpeaking() {
    if (this.isSpeaking && this.speechSynthesis) {
      this.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
      console.log('🎤 Reproducción de voz detenida');
    }
  }

  /**
   * Pausa la reproducción actual
   */
  pauseSpeaking() {
    if (this.isSpeaking && this.speechSynthesis) {
      this.speechSynthesis.pause();
      console.log('🎤 Reproducción de voz pausada');
    }
  }

  /**
   * Reanuda la reproducción pausada
   */
  resumeSpeaking() {
    if (this.speechSynthesis) {
      this.speechSynthesis.resume();
      console.log('🎤 Reproducción de voz reanudada');
    }
  }

  /**
   * Verifica si está hablando actualmente
   */
  isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }

  /**
   * Obtiene las voces disponibles
   */
  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.speechSynthesis.getVoices();
  }

  /**
   * Cambia la voz actual
   */
  setVoice(voice: SpeechSynthesisVoice) {
    this.voice = voice;
    
    // Guardar la selección en localStorage
    try {
      localStorage.setItem('selectedVoice', JSON.stringify({
        name: voice.name,
        lang: voice.lang,
        voiceURI: voice.voiceURI
      }));
      console.log('🎤 Voz cambiada y guardada:', voice.name);
    } catch (error) {
      console.log('🎤 Error guardando voz:', error);
    }
  }

  /**
   * Obtiene la configuración actual
   */
  getSettings() {
    return {
      enabled: this.isEnabled,
      volume: this.volume,
      rate: this.rate,
      pitch: this.pitch,
      voice: this.voice?.name || 'Por defecto',
      isSpeaking: this.isSpeaking
    };
  }
}
