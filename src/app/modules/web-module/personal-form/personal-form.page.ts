import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.page.html',
  styleUrls: ['./personal-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PersonalFormPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
