import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyPagePage } from './privacy-page.page';

describe('PrivacyPagePage', () => {
  let component: PrivacyPagePage;
  let fixture: ComponentFixture<PrivacyPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrivacyPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
