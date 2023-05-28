import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatRoomPage implements OnInit {

  messageArray: any[] = [];
  private stompClient: any = null;
  newmessage!: string;

  constructor() { }

  ngOnInit() {
    const userName = sessionStorage.getItem("emailAddress");

    let sock = new SockJS(environment.web_soket);
    this.stompClient = Stomp.over(sock);
    const _this = this;

    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/user/' + userName + '/private', function (hello: any) {
        _this.showMessages(JSON.parse(hello.body));
      });
    }, (err: any) => {
      console.log(err);
    });

  }

  showMessages(message: any) {
    this.messageArray.push(message);
  }

  sendPrivateMessage() {
    const messageModel = {
      senderName:  localStorage.getItem("emailAddress"),
      recieverName: sessionStorage.getItem("recName"),
      message: this.newmessage,
      status: "MESSAGE"
    }

    this.stompClient.send('/app/private-message', {}, JSON.stringify(messageModel))
    this.newmessage = "";
  }

}
