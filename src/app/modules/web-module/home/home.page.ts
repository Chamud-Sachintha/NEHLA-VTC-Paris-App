import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperComponent, SwiperModule } from 'swiper/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SwiperModule]
})
export class HomePage implements OnInit {

  img1 = "https://img.icons8.com/bubbles/100/null/car.png";

  @ViewChild('swiper') swiper!: SwiperComponent;
  animationInProgress = false;

  config = {
    slidesPerView: 2,
    spaceBetween: 0,
    pagination: true,
    loop: true,
  }

  constructor() { }

  ngOnInit() {
    this.startAnimation();
  }

  sayHellow() {
    alert("ok");
  }

  startAnimation() {
    if(this.animationInProgress) return;
    this.animationInProgress = true;
    setTimeout(() => {
      this.swiper.swiperRef.slideNext(2000);
      this.animationInProgress = false;
      this.startAnimation();
    }, 5000);
  }

}
