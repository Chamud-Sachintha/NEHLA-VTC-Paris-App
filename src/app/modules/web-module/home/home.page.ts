import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SwiperModule]
})
export class HomePage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  constructor() { }

  ngOnInit() {
  }

}
