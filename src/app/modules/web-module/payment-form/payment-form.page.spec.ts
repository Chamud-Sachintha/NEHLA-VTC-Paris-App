import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentFormPage } from './payment-form.page';

describe('PaymentFormPage', () => {
  let component: PaymentFormPage;
  let fixture: ComponentFixture<PaymentFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
