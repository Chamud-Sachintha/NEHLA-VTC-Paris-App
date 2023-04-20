import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinationDetailsPage } from './destination-details.page';

describe('DestinationDetailsPage', () => {
  let component: DestinationDetailsPage;
  let fixture: ComponentFixture<DestinationDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DestinationDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
