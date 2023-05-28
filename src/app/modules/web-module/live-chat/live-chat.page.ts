import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatServiceService } from 'src/app/services/chat-service.service';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.page.html',
  styleUrls: ['./live-chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LiveChatPage implements OnInit {

  constructor(private chatService: ChatServiceService) { }

  ngOnInit() {
    console.log("dshfgjsdfjsddf");
    this.getConnectedAgentList();
  }

  getConnectedAgentList() {
    this.chatService.getAllConnectedAgentList().subscribe((data) => {
      console.log(data);
    })
  }

}
