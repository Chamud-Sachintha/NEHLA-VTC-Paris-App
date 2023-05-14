import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginPage } from '../auth-module/login/login.page';
import { VehicleDetailsPage } from './vehicle-details/vehicle-details.page';
import { DestinationDetailsPage } from './destination-details/destination-details.page';
import { PackageDetailsPage } from './package-details/package-details.page';
import { ContactUsPage } from './contact-us/contact-us.page';
import { BookingPage } from './booking/booking.page';
import { JourneyFormPage } from './journey-form/journey-form.page';
import { QuotationFormPage } from './quotation-form/quotation-form.page';
import { PersonalFormPage } from './personal-form/personal-form.page';
import { PaymentFormPage } from './payment-form/payment-form.page';
import { AuthGuardGuard } from 'src/app/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomePage
      }
    ]
  },

  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'vehicles',
    component: VehicleDetailsPage
  },
  {
    path: 'destinations',
    component: DestinationDetailsPage
  },
  {
    path: 'packages',
    component: PackageDetailsPage
  },
  {
    path: 'contact-us',
    component: ContactUsPage
  },
  {
    path: 'booking',
    component: BookingPage,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: '',
        component: JourneyFormPage
      },
      {
        path: 'quotation-form',
        component: QuotationFormPage,
        pathMatch: 'full'
      },
      {
        path: 'personal-form',
        component: PersonalFormPage,
        pathMatch: 'full'
      },
      {
        path: 'payment-form',
        component: PaymentFormPage,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebModuleRoutingModule { }
