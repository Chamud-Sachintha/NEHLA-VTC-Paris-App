import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { DestinationServiceService } from 'src/app/services/destination-service.service';
import { Destination } from 'src/app/models/destination';

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.page.html',
  styleUrls: ['./destination-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DestinationDetailsPage implements OnInit {

  timer: any = 0;
  isLoading!: boolean;
  allDestinationList: Destination[] = [];

  constructor(private destinationService: DestinationServiceService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getAllDestionations();
  }

  async getAllDestionations() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });

    await loading.present();

    this.destinationService.getAllDestinations().subscribe((resp) => {
      const dataList = JSON.parse(JSON.stringify(resp));
      
      dataList.data[0].forEach((element: any) => {
        this.allDestinationList.push(element);
      });

    }, (err) => {

    })

    await loading.onDidDismiss();
  }

}
