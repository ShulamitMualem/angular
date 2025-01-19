import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayLoginComponent } from './pay-login.component';

describe('PayLoginComponent', () => {
  let component: PayLoginComponent;
  let fixture: ComponentFixture<PayLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
