import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ChatRoomPage implements OnInit {

  messageArray: any[] = [];
  private stompClient: any = null;
  newMessage!: string;
  messageForm!: FormGroup;
  sendMessageArray: any[] = [];
  userName!: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createSumbitMessageControl();
    this.userName = localStorage.getItem("emailAddress");

    let sock = new SockJS(environment.web_soket);
    this.stompClient = Stomp.over(sock);
    const _this = this;

    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/user/' + _this.userName + '/private', function (hello: any) {
        _this.showMessages(JSON.parse(hello.body));
      });
    }, (err: any) => {
      console.log(err);
    });

  }

  createSumbitMessageControl() {
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required]
    })
  }

  showMessages(message: any) {
    this.messageArray.push(message);
  }

  sendPrivateMessage() {
    const messageModel = {
      senderName:  localStorage.getItem("emailAddress"),
      recieverName: sessionStorage.getItem("recName"),
      message: this.messageForm.controls['message'].value,
      status: "MESSAGE"
    }

    this.messageArray.push(messageModel);

    this.stompClient.send('/app/private-message', {}, JSON.stringify(messageModel))
    this.messageForm.controls['message'].setValue('');
    this.newMessage = "";
  }

}
