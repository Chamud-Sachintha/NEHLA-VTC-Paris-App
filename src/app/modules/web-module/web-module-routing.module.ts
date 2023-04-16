import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginPage } from '../auth-module/login/login.page';

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
    path: 'account',
    children: [
      {
        path: '',
        component: LoginPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebModuleRoutingModule { }
