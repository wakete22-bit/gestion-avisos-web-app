import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerAvisosComponent } from './ver-avisos.component';

describe('VerAvisosComponent', () => {
  let component: VerAvisosComponent;
  let fixture: ComponentFixture<VerAvisosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VerAvisosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerAvisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
