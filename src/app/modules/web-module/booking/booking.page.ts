import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JourneyFormPage } from '../journey-form/journey-form.page';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, JourneyFormPage, RouterOutlet]
})
export class BookingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
