import { Component, Input, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-safe-area-wrapper',
  template: `
    <div class="safe-area-wrapper" [class]="wrapperClasses">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .safe-area-wrapper {
      width: 100%;
      height: 100%;
    }
    
    .safe-area-wrapper.content-safe-top {
      padding-top: var(--safe-area-top);
    }
    
    .safe-area-wrapper.content-safe-bottom {
      padding-bottom: var(--safe-area-bottom);
    }
    
    .safe-area-wrapper.content-safe-vertical {
      padding-top: var(--safe-area-top);
      padding-bottom: var(--safe-area-bottom);
    }
    
    .safe-area-wrapper.content-safe-all {
      padding-top: var(--safe-area-top);
      padding-bottom: var(--safe-area-bottom);
      padding-left: var(--safe-area-left);
      padding-right: var(--safe-area-right);
    }
    
    .safe-area-wrapper.footer-safe {
      padding-bottom: var(--safe-margin-bottom);
    }
    
    .safe-area-wrapper.header-safe {
      padding-top: var(--safe-margin-top);
    }
  `]
})
export class SafeAreaWrapperComponent implements OnInit {
  @Input() top: boolean = false;
  @Input() bottom: boolean = false;
  @Input() left: boolean = false;
  @Input() right: boolean = false;
  @Input() footer: boolean = false;
  @Input() header: boolean = false;
  
  wrapperClasses: string = '';
  isIOS: boolean = false;
  isAndroid: boolean = false;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    this.detectPlatform();
    this.setWrapperClasses();
    this.addPlatformClass();
  }

  private detectPlatform() {
    if (isPlatform('ios')) {
      this.isIOS = true;
    } else if (isPlatform('android')) {
      this.isAndroid = true;
    }
  }

  private setWrapperClasses() {
    const classes: string[] = [];

    if (this.header) {
      classes.push('header-safe');
    } else if (this.top) {
      classes.push('content-safe-top');
    }

    if (this.footer) {
      classes.push('footer-safe');
    } else if (this.bottom) {
      classes.push('content-safe-bottom');
    }

    if (this.left || this.right) {
      if (this.top && this.bottom) {
        classes.push('content-safe-vertical');
      } else if (this.top) {
        classes.push('content-safe-top');
      } else if (this.bottom) {
        classes.push('content-safe-bottom');
      }
      
      if (this.left && this.right) {
        classes.push('content-safe-all');
      }
    }

    this.wrapperClasses = classes.join(' ');
  }

  private addPlatformClass() {
    if (this.isIOS) {
      this.renderer.addClass(document.body, 'ios');
    } else if (this.isAndroid) {
      this.renderer.addClass(document.body, 'android');
    }
  }
}
