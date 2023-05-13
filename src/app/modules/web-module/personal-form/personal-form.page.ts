import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Client } from '../../../models/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.page.html',
  styleUrls: ['./personal-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PersonalFormPage implements OnInit {

  clientDetails = new Client();

  constructor(private router: Router) { }

  ngOnInit() {
    this.setClientDetails();
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
