import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss']
})

export class ListComponent implements OnInit {

  chats = []

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getChatList()
      .subscribe((res:any)=>{
        this.chats = res;
      })
   }
}