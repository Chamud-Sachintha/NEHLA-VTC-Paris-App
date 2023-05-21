import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { DatePipe } from '@angular/common';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { defineCustomElements } from '@stripe-elements/stripe-elements/loader';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatePipe,
    importProvidersFrom(IonicModule.forRoot({}), HttpClientModule, RouterModule, FormsModule, ReactiveFormsModule, GoogleMapsModule
                        , GooglePlaceModule),
    provideRouter(routes),
  ],
})
.then(() => defineCustomElements(window));
