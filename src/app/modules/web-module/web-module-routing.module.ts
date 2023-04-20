import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginPage } from '../auth-module/login/login.page';
import { VehicleDetailsPage } from './vehicle-details/vehicle-details.page';
import { DestinationDetailsPage } from './destination-details/destination-details.page';
import { PackageDetailsPage } from './package-details/package-details.page';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebModuleRoutingModule { }
