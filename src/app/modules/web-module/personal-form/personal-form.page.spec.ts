import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalFormPage } from './personal-form.page';

describe('PersonalFormPage', () => {
  let component: PersonalFormPage;
  let fixture: ComponentFixture<PersonalFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PersonalFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
