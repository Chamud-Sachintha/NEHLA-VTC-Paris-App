import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuotationFormPage } from './quotation-form.page';

describe('QuotationFormPage', () => {
  let component: QuotationFormPage;
  let fixture: ComponentFixture<QuotationFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuotationFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
