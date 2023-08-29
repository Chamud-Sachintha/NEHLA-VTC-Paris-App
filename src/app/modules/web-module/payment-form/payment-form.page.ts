import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';
import { PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { JouneyForm } from 'src/app/models/jouney-form';
import { StripeServiceService } from 'src/app/services/stripe-service.service';
import { HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.page.html',
  styleUrls: ['./payment-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PaymentFormPage implements OnInit {

  data: any = {};
  journeyDetails = new JouneyForm();
  selectedVehicleName!: string;
  price!: number;
  paymentFormPageValues: any[] = [];
  paymentIntent!: any;
  ephemeralKey!: any;
  customer!: any;
  paymentInfo: any[] = [];

  constructor(private dataShareService: DataShareService, private stripeService: StripeServiceService, private router: Router) {
    Stripe.initialize({
      publishableKey: environment.STRIPE_PK,
    });
  }

  ngOnInit() {
    this.setPaymentFormDataValues();
  }

  setPaymentFormDataValues() {
    this.dataShareService.getPageValueArray().subscribe((data) => {
      this.journeyDetails.from = data[0].from;
      this.journeyDetails.to = data[0].to;
      this.selectedVehicleName = data[0].vehicleName;
      this.price = data[0].price;
      this.journeyDetails.tripType = data[0].tripType;
      this.journeyDetails.passengerCount = data[0].passengerCount;
      this.journeyDetails.luggageCount = data[0].luggageCount;
      this.journeyDetails.babySeatCount = data[0].luggageCount;
    });
  }

  async paymentSheetStripe() {

    this.data = {
      name: localStorage.getItem("firstName"),
      email: localStorage.getItem("emailAddress"),
      amount: this.price,
      currency: 'LKR'
    }

    try {
      // be able to get event of PaymentSheet
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });

      const data = new HttpParams({
        fromObject: this.data
      })

      const data$:any = [];
      this.stripeService.getUniqueIDsFromStripe(data).subscribe((data) => {
        const dataList = JSON.parse(JSON.stringify(data));
        
        localStorage.setItem("paymentIntent", dataList.data[0].paymentIntent);
        localStorage.setItem("ephemeralKey", dataList.data[0].ephemeralKeys);
        localStorage.setItem("customer", dataList.data[0].customer);

        this.getPaymentIntentDetails();
      });
    } catch (err) {
      console.log(err);
    }
    
  }

  async getPaymentIntentDetails() {
      this.paymentIntent = localStorage.getItem("paymentIntent");
      this.ephemeralKey = localStorage.getItem("ephemeralKey");
      this.customer = localStorage.getItem("customer");
      
      // const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);

      // prepare PaymentSheet with CreatePaymentSheetOption.
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: this.paymentIntent,
        customerId: this.customer,
        customerEphemeralKeySecret: this.ephemeralKey,
        merchantDisplayName: 'Chamud Sachintha'
      });

      // present PaymentSheet and get result.
      const result = await Stripe.presentPaymentSheet();
      if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
        // Happy path
        const sessionObj = {
          session_id: this.customer
        }
        this.stripeService.addSuccessPaymentLog(sessionObj).subscribe((data) => {
          console.log(data)
        })
      }
  }

}
