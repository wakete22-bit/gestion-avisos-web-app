import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrearAvisosModalComponent } from './crear-avisos-modal.component';

describe('CrearAvisosModalComponent', () => {
  let component: CrearAvisosModalComponent;
  let fixture: ComponentFixture<CrearAvisosModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CrearAvisosModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearAvisosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
