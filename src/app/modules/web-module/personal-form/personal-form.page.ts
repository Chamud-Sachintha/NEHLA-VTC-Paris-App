import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Client } from '../../../models/client';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';
import { DestinationServiceService } from 'src/app/services/destination-service.service';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.page.html',
  styleUrls: ['./personal-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PersonalFormPage implements OnInit {

  from!: string;
  selectedVehicleName!: string;
  destinationId!: string;
  passengerCountIdx!: number;
  price!: number;
  luggageCount!: number;
  babySeatCount!: number;
  tripType!: string;
  destination!: string;
  personalFormDataValues: any = [];
  clientDetails = new Client();

  constructor(private dataShareService: DataShareService, private router: Router, private destinationService: DestinationServiceService) { }

  ngOnInit() {
    this.getQuotationFormValues();
    this.setClientDetails();
  }

  getQuotationFormValues() {
    this.dataShareService.getPageValueArray().subscribe((data) => {
      this.from = data[0].from;
      this.selectedVehicleName = data[0].selectedVehicleName;
      this.destinationId = data[0].destinationId;
      this.passengerCountIdx = data[0].passengerCountIdx;
      this.price = data[0].price;
      this.tripType = data[0].tripType;
      this.luggageCount = data[0].luggageCount;
      this.babySeatCount = data[0].babySeatCount;
      this.destination = data[0].destination;
    });
  }

  setClientDetails() {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const emailAddress = localStorage.getItem("emailAddress");
    const mobileNumber = localStorage.getItem("mobileNumber");

    this.clientDetails.first_name = firstName == null ? "" : firstName;
    this.clientDetails.last_name = lastName == null ? "" : lastName;
    this.clientDetails.email = emailAddress == null ? "" : emailAddress;
    this.clientDetails.mobile_number = mobileNumber == null ? "" : mobileNumber;
  }

  goToPaymentForm() {
    const data = {
      from: this.from,
      to: this.destination,
      vehicleName: this.selectedVehicleName,
      price: this.price,
      tripType: this.tripType,
      passengerCount: this.passengerCountIdx,
      babySeatCount: 0,
      luggageCount: this.luggageCount
    }

    this.personalFormDataValues.push(data);
    this.dataShareService.setPageValueArray(this.personalFormDataValues);

    this.router.navigate(['/booking/payment-form']);
  }

}
