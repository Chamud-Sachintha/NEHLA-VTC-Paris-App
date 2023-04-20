import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.page.html',
  styleUrls: ['./package-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PackageDetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
