import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-privacy-page',
  templateUrl: './privacy-page.page.html',
  styleUrls: ['./privacy-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PrivacyPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
