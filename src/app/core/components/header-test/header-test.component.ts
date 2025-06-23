import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header-test',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <div class="header-test">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Header Test</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="test-info">
            <p><strong>Safe Areas:</strong></p>
            <p>Top: {{ safeAreaTop }}</p>
            <p>Bottom: {{ safeAreaBottom }}</p>
            
            <p><strong>Header Heights:</strong></p>
            <p>Base Height: 66px</p>
            <p>Total Height: {{ totalHeaderHeight }}px</p>
            
            <p><strong>Content Margins:</strong></p>
            <p>Main Content Margin: {{ mainContentMargin }}px</p>
            
            <p><strong>Viewport:</strong></p>
            <p>Width: {{ viewportWidth }}px</p>
            <p>Height: {{ viewportHeight }}px</p>
          </div>
          
          <div class="visual-test">
            <div class="header-visual" [style.height]="totalHeaderHeight + 'px'">
              <span>Header: {{ totalHeaderHeight }}px</span>
            </div>
            <div class="content-visual" [style.margin-top]="mainContentMargin + 'px'">
              <span>Content Area</span>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </div>
  `,
  styles: [`
    .header-test {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 1003;
      max-width: 300px;
    }
    
    .test-info p {
      margin: 4px 0;
      font-size: 12px;
    }
    
    .visual-test {
      margin-top: 16px;
      border: 2px solid #ccc;
      background: #f0f0f0;
    }
    
    .header-visual {
      background: rgba(255, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: white;
      border-bottom: 1px solid #ccc;
    }
    
    .content-visual {
      background: rgba(0, 255, 0, 0.3);
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: white;
    }
  `]
})
export class HeaderTestComponent implements OnInit {
  safeAreaTop = '0px';
  safeAreaBottom = '0px';
  totalHeaderHeight = 66;
  mainContentMargin = 66;
  viewportWidth = 0;
  viewportHeight = 0;

  ngOnInit() {
    this.updateInfo();
    
    // Actualizar cada segundo
    setInterval(() => {
      this.updateInfo();
    }, 1000);
  }

  updateInfo() {
    // Obtener safe areas
    this.safeAreaTop = this.getComputedValue('env(safe-area-inset-top)');
    this.safeAreaBottom = this.getComputedValue('env(safe-area-inset-bottom)');
    
    // Calcular alturas
    const safeAreaTopValue = parseInt(this.safeAreaTop) || 0;
    this.totalHeaderHeight = 66 + safeAreaTopValue;
    this.mainContentMargin = 66 + safeAreaTopValue;
    
    // Obtener viewport
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;
  }

  private getComputedValue(property: string): string {
    const testElement = document.createElement('div');
    testElement.style.position = 'absolute';
    testElement.style.visibility = 'hidden';
    testElement.style[property as any] = property;
    document.body.appendChild(testElement);
    
    const computedValue = getComputedStyle(testElement)[property as any];
    document.body.removeChild(testElement);
    
    return computedValue || '0px';
  }
} 