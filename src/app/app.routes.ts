import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { WebLayoutComponent } from './layouts/web-layout/web-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("./modules/web-module/web-module.module").then(m => m.WebModuleModule)
      }
    ]
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("./modules/auth-module/auth-module.module").then(m => m.AuthModuleModule)
      }
    ]
  },
];
