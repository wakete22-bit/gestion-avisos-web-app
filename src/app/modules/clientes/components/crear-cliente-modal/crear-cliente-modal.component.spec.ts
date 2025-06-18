import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrearClienteModalComponent } from './crear-cliente-modal.component';

describe('CrearClienteModalComponent', () => {
  let component: CrearClienteModalComponent;
  let fixture: ComponentFixture<CrearClienteModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CrearClienteModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearClienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
