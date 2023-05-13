import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { DestinationServiceService } from 'src/app/services/destination-service.service';
import { Destination } from 'src/app/models/destination';

@Component({
  selector: 'app-journey-form',
  templateUrl: './journey-form.page.html',
  styleUrls: ['./journey-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, GooglePlaceModule]
})
export class JourneyFormPage implements OnInit {

  journeyForm!: FormGroup;
  journeyFormValues: any[] = [];
  destinationList: Destination[] = [];
  inverseStatus: boolean = false;

  constructor(public formBuilder: FormBuilder, public dataSharedService: DataShareService, public route: Router
    , public alertController: AlertController, private destinationService: DestinationServiceService) {
  }

  ngOnInit() {
    this.createJouneyForm();
    this.getAlldestinationsAvailable();
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
      this.dataSharedService.setPageValueArray(this.journeyFormValues);

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

  handleAddressChange(address: any) {
    this.journeyForm.controls['from'].setValue(address.formatted_address);
  }

  getAlldestinationsAvailable() {
    this.destinationService.getAllDestinations().subscribe((resp) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      dataList.data[0].forEach((element: any) => {
        this.destinationList.push(element);
      });
    });
  }

  onClickChangeBtn() {
    const fromSection = document.getElementById("fromSection");
    const toSection: any = document.getElementById("toSection");

    if (!this.inverseStatus) {
      const cpyFromsection: any = fromSection!.firstChild;

      fromSection!.removeChild(cpyFromsection);
      fromSection?.appendChild(toSection.firstChild);
      fromSection?.appendChild(toSection.lastChild);

      toSection.appendChild(cpyFromsection);
      this.inverseStatus = true;
    } else {
      const fromSectionFirstChild: any = document.getElementById("fromSection")?.firstChild;
      const fromSectionLastChild: any = document.getElementById("fromSection")?.lastChild;

      fromSection?.removeChild(fromSectionFirstChild);
      fromSection?.removeChild(fromSectionLastChild);
      
      fromSection?.appendChild(toSection.firstChild);

      toSection.appendChild(fromSectionFirstChild);
      toSection.appendChild(fromSectionLastChild);

      this.inverseStatus = false;
    }

    return false;
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
