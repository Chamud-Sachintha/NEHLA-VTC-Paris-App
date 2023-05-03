import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';
import { JouneyForm } from 'src/app/models/jouney-form';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-quotation-form',
  templateUrl: './quotation-form.page.html',
  styleUrls: ['./quotation-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, GoogleMapsModule]
})
export class QuotationFormPage implements OnInit {

  options: google.maps.MapOptions = {
    center: {lat: 6.9778, lng: 79.9272},
    zoom: 10
  };
  apiLoaded!: Observable<boolean>;
  journeyForm = new JouneyForm();
  selectedVehicle!: string;
  firstVehicle: boolean = false;
  secondVehicle: boolean = false;

  constructor(public dataShareService: DataShareService, public router: Router, httpClient: HttpClient
            , public alertController: AlertController) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyB1ZVPSd5Nux1uSrVM59Srk7G9-uXxSfuM&amp', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit() {
    this.getJourneyFormFeildsValues();
  }

  getJourneyFormFeildsValues() {
    this.dataShareService.getJouneyDataValues().subscribe((data) => {
      this.journeyForm.from = data[0].from;
      this.journeyForm.to = data[0].to;
      this.journeyForm.tripType = data[0].tripType;
      this.journeyForm.passengerCount = data[0].tripType;
      this.journeyForm.luggageCount = data[0].luggageCount;
      this.journeyForm.date = data[0].date;
      this.journeyForm.flightNumber = data[0].fliaghtNumber;
      this.journeyForm.babySeatCount = data[0].babySeatCount;
    });
  }

  goToPersonalFormPage() {

    if (this.selectedVehicle == null) {
      this.openThePopupModelForValidation('Vehicle is Required', null, 'Please Select a Vehicle.');
    } else {
      this.router.navigate(['/booking/personal-form']);
    }
  }

  vehicleSelectAction(vehicleName: string, vehicleNumber: number) {

    if (vehicleNumber == 1) {
      this.firstVehicle = true;
      this.secondVehicle = false;
    }

    if (vehicleNumber == 2) {
      this.firstVehicle = false;
      this.secondVehicle = true;
    }
    this.selectedVehicle = vehicleName;
  }

  async openThePopupModelForValidation(header: string, subHeader: any = null, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
