import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.page.html',
  styleUrls: ['./destination-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DestinationDetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
