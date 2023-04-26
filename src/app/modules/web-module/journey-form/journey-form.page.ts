import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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

  constructor(public formBuilder: FormBuilder,public dataSharedService: DataShareService, public route: Router) {
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
    this.journeyFormValues.push(this.journeyForm.value);
    this.dataSharedService.setJouneyDataValues(this.journeyFormValues);

    this.route.navigate(['/booking/quotation-form']);
  }

}
