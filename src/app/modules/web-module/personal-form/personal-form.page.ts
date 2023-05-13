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

  selectedVehicleName!: string;
  destinationId!: string;
  passengerCountIdx!: number;
  price!: number;
  clientDetails = new Client();

  constructor(private dataShareService: DataShareService, private router: Router, private destinationService: DestinationServiceService) { }

  ngOnInit() {
    this.getQuotationFormValues();
    this.setClientDetails();
  }

  getQuotationFormValues() {
    this.dataShareService.getPageValueArray().subscribe((data) => {
      this.selectedVehicleName = data[0].selectedVehicleName;
      this.destinationId = data[0].destinationId;
      this.passengerCountIdx = data[0].passengerCountIdx;
      this.price = data[0].price;
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
    this.router.navigate(['/booking/payment-form']);
  }

}
