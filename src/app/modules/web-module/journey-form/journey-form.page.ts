import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journey-form',
  templateUrl: './journey-form.page.html',
  styleUrls: ['./journey-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class JourneyFormPage implements OnInit {

  constructor(public route: Router) { }

  ngOnInit() {
  }

  onSubmitFirstForm() {
    this.route.navigate(['/booking/quotation-form']);
  }

}
