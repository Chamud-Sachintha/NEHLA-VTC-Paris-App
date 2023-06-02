import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.page.html',
  styleUrls: ['./live-chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LiveChatPage implements OnInit {

  currentDateTime!: any;
  agentList: any[] = [];

  constructor(private chatService: ChatServiceService, public datepipe: DatePipe, private router: Router) {
    this.currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
  }

  ngOnInit() {
    this.getConnectedAgentList();
  }

  getConnectedAgentList() {
    this.chatService.getAllConnectedAgentList().subscribe((data) => {
      const dataList = JSON.parse(JSON.stringify(data));

      dataList.data[0].forEach((element: any) => {
        this.agentList.push(element)
      })
    })
  }

  setAgentData(userName: any) {
    sessionStorage.setItem("recName", userName);
    this.router.navigate(['/chat-room']);
  }

}
