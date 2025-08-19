import { Component } from '@angular/core';

@Component({
  selector: 'app-safe-areas-example',
  template: `
    <!-- Ejemplo 1: Página con header y footer seguros -->
    <div class="page-example">
      <!-- Header con zona segura superior -->
      <header class="example-header header-safe">
        <h1>Mi Aplicación</h1>
        <p>Header con zona segura superior</p>
      </header>

      <!-- Contenido principal -->
      <main class="example-content content-safe-vertical">
        <h2>Contenido Principal</h2>
        <p>Este contenido respeta las zonas seguras superior e inferior.</p>
        
        <!-- Simular contenido largo -->
        <div class="content-blocks">
          <div class="content-block" *ngFor="let i of [1,2,3,4,5,6,7,8,9,10]">
            <h3>Sección {{ i }}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </main>

      <!-- Footer con zona segura inferior -->
      <footer class="example-footer footer-safe">
        <div class="footer-content">
          <button class="btn btn-primary">Acción Principal</button>
          <button class="btn btn-secondary">Acción Secundaria</button>
        </div>
      </footer>
    </div>

    <!-- Ejemplo 2: Uso del componente wrapper -->
    <div class="page-example">
      <app-safe-area-wrapper [header]="true" [footer]="true">
        <div class="example-content">
          <h2>Usando Safe Area Wrapper</h2>
          <p>Este contenido usa el componente wrapper para manejar zonas seguras.</p>
          
          <div class="content-blocks">
            <div class="content-block" *ngFor="let i of [1,2,3,4,5]">
              <h3>Sección {{ i }}</h3>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
        </div>
      </app-safe-area-wrapper>
    </div>

    <!-- Ejemplo 3: Footer fijo con zona segura -->
    <div class="page-example">
      <div class="example-content content-safe-bottom">
        <h2>Footer Fijo</h2>
        <p>Esta página tiene un footer fijo que respeta la zona segura inferior.</p>
        
        <div class="content-blocks">
          <div class="content-block" *ngFor="let i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]">
            <h3>Sección {{ i }}</h3>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>
        </div>
      </div>

      <app-safe-footer [fixed]="true">
        <div class="footer-actions">
          <button class="btn btn-primary">Guardar</button>
          <button class="btn btn-secondary">Cancelar</button>
        </div>
      </app-safe-footer>
    </div>

    <!-- Ejemplo 4: Modal con zonas seguras -->
    <div class="page-example">
      <div class="example-content">
        <h2>Modal con Zonas Seguras</h2>
        <p>Los modales también pueden usar zonas seguras.</p>
        
        <button class="btn btn-primary" (click)="showModal = true">
          Abrir Modal
        </button>
      </div>

      <!-- Modal con zonas seguras -->
      <div class="modal-overlay" *ngIf="showModal" (click)="showModal = false">
        <div class="modal-content modal-safe" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Modal con Zonas Seguras</h3>
            <button class="modal-close" (click)="showModal = false">×</button>
          </div>
          
          <div class="modal-body">
            <p>Este modal respeta las zonas seguras del dispositivo.</p>
            <p>El contenido no se solapará con el notch o la barra de navegación.</p>
          </div>
          
          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="showModal = false">Cancelar</button>
            <button class="btn btn-primary">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-example {
      margin-bottom: 40px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
    }

    .example-header {
      background: #4f46e5;
      color: white;
      padding: 16px;
      text-align: center;
    }

    .example-header h1 {
      margin: 0 0 8px 0;
      font-size: 1.5rem;
    }

    .example-header p {
      margin: 0;
      opacity: 0.9;
    }

    .example-content {
      padding: 16px;
      min-height: 400px;
    }

    .content-blocks {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .content-block {
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }

    .content-block h3 {
      margin: 0 0 8px 0;
      color: #1e293b;
    }

    .content-block p {
      margin: 0;
      color: #64748b;
      line-height: 1.5;
    }

    .example-footer {
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      padding: 16px;
    }

    .footer-content {
      display: flex;
      gap: 12px;
      justify-content: center;
    }

    .footer-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: #4f46e5;
      color: white;
    }

    .btn-primary:hover {
      background: #4338ca;
    }

    .btn-secondary {
      background: #6b7280;
      color: white;
    }

    .btn-secondary:hover {
      background: #4b5563;
    }

    /* Modal styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 500px;
      max-height: 80vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .modal-header {
      padding: 20px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h3 {
      margin: 0;
      color: #1e293b;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #64748b;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color 0.2s ease;
    }

    .modal-close:hover {
      background: #f1f5f9;
    }

    .modal-body {
      padding: 20px;
      flex: 1;
      overflow-y: auto;
    }

    .modal-body p {
      margin: 0 0 12px 0;
      color: #64748b;
      line-height: 1.6;
    }

    .modal-footer {
      padding: 20px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .example-content {
        min-height: 300px;
      }
      
      .modal-content {
        width: 95%;
        margin: 16px;
      }
      
      .footer-content,
      .footer-actions {
        flex-direction: column;
      }
      
      .btn {
        width: 100%;
      }
    }
  `]
})
export class SafeAreasExampleComponent {
  showModal = false;
}
