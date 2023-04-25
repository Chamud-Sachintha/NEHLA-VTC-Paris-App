import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-quotation-form',
  templateUrl: './quotation-form.page.html',
  styleUrls: ['./quotation-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class QuotationFormPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
