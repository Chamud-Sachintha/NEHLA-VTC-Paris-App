import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JourneyFormPage } from './journey-form.page';

describe('JourneyFormPage', () => {
  let component: JourneyFormPage;
  let fixture: ComponentFixture<JourneyFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JourneyFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
