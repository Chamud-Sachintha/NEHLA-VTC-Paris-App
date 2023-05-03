import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-journey-form',
  templateUrl: './journey-form.page.html',
  styleUrls: ['./journey-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class JourneyFormPage implements OnInit {

  journeyForm!: FormGroup;
  journeyFormValues: any[] = [];

  constructor(public formBuilder: FormBuilder, public dataSharedService: DataShareService, public route: Router
    , public alertController: AlertController) {
  }

  ngOnInit() {
    this.createJouneyForm();
  }

  createJouneyForm() {
    this.journeyForm = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      tripType: ['', Validators.required],
      passengerCount: ['', Validators.required],
      luggageCount: ['', Validators.required],
      date: new FormControl(),
      fliaghtNumber: ['', Validators.required],
      babySeats: ['', Validators.required]
    });
  }

  onSubmitFirstForm() {

    if (this.validateProcessForFeilds() != false) {
      this.journeyFormValues.push(this.journeyForm.value);
      this.dataSharedService.setJouneyDataValues(this.journeyFormValues);

      this.route.navigate(['/booking/quotation-form']);
    }
  }

  validateProcessForFeilds() {

    if (this.journeyForm.controls['from'].value == '') {
      this.openThePopupModelForValidation('Empty Feilds Found', null, 'From Feild is Required.');
      return false;
    }
    else if (this.journeyForm.controls['to'].value == '') {
      this.openThePopupModelForValidation('Empty Feilds Found', null, 'To Feild is Required.');
      return false;
    } else if (this.journeyForm.controls['tripType'].value == '') {
      this.openThePopupModelForValidation('Empty Feilds Found', null, 'Ttip Type Feild is Required.');
      return false;
    } else if (this.journeyForm.controls['passengerCount'].value == '') {
      this.openThePopupModelForValidation('Empty Feilds Found', null, 'Passenger Count Feild is Required.');
      return false;
    } else if (this.journeyForm.controls['date'].value == null) {
      this.openThePopupModelForValidation('Empty Feilds Found', null, 'Date Feild is Required.');
      return false;
    } else {
      return true;
    }
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
