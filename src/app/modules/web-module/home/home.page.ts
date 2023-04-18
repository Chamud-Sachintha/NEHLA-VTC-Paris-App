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

  @ViewChild('swiper') swiper!: SwiperComponent;
  animationInProgress = false;

  config = {
    slidesPerView: 1,
    spaceBetween: 10,
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
