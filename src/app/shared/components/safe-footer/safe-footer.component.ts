import { Component, Input, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-safe-footer',
  template: `
    <footer class="safe-footer" [class]="footerClasses">
      <div class="footer-content">
        <ng-content></ng-content>
      </div>
      <div class="footer-safe-area"></div>
    </footer>
  `,
  styles: [`
    .safe-footer {
      position: relative;
      width: 100%;
      background: #fff;
      border-top: 1px solid #e2e8f0;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .footer-content {
      padding: 16px;
      padding-bottom: calc(16px + var(--safe-area-bottom));
    }
    
    .footer-safe-area {
      height: var(--safe-area-bottom);
      background: inherit;
    }
    
    .safe-footer.ios .footer-content {
      padding-bottom: calc(16px + var(--safe-area-bottom) + 8px);
    }
    
    .safe-footer.android .footer-content {
      padding-bottom: calc(16px + var(--safe-area-bottom) + 4px);
    }
    
    .safe-footer.fixed {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }
    
    .safe-footer.sticky {
      position: sticky;
      bottom: 0;
      z-index: 1000;
    }
    
    .safe-footer.transparent {
      background: transparent;
      border-top: none;
      box-shadow: none;
    }
    
    .safe-footer.dark {
      background: #1f2937;
      border-top-color: #374151;
      color: #f9fafb;
    }
  `]
})
export class SafeFooterComponent implements OnInit {
  @Input() fixed: boolean = false;
  @Input() sticky: boolean = false;
  @Input() transparent: boolean = false;
  @Input() dark: boolean = false;
  
  footerClasses: string = '';
  isIOS: boolean = false;
  isAndroid: boolean = false;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    this.detectPlatform();
    this.setFooterClasses();
  }

  private detectPlatform() {
    if (isPlatform('ios')) {
      this.isIOS = true;
    } else if (isPlatform('android')) {
      this.isAndroid = true;
    }
  }

  private setFooterClasses() {
    const classes: string[] = [];

    if (this.fixed) {
      classes.push('fixed');
    } else if (this.sticky) {
      classes.push('sticky');
    }

    if (this.transparent) {
      classes.push('transparent');
    }

    if (this.dark) {
      classes.push('dark');
    }

    if (this.isIOS) {
      classes.push('ios');
    } else if (this.isAndroid) {
      classes.push('android');
    }

    this.footerClasses = classes.join(' ');
  }
}
