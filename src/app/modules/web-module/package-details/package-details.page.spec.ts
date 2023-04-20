import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackageDetailsPage } from './package-details.page';

describe('PackageDetailsPage', () => {
  let component: PackageDetailsPage;
  let fixture: ComponentFixture<PackageDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PackageDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
