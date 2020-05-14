import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeLast, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CustomerService } from 'src/app/core/services/customer.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls:['chat.component.scss']
})

export class ChatComponent implements OnInit, OnDestroy {
  userId
  private ngUnsubscribe: Subject<any> = new Subject()
  user = {}
  me = {};
  messages = [];
  inputValue = ''

  chatForm = new FormGroup({
    msg: new FormControl('', Validators.required)
  })

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    public customerService:CustomerService) { }

  ngOnInit() {
    this.me = this.customerService.getCurrentValueCustomer()
    this.route.paramMap.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((params)=>{
      this.userId = params.get('userId');
      this.customerService.getCustomer(this.userId)
        .subscribe((user)=>{
          this.user = user;
        })
    })
    this.chatService.getSocketMessages()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe((data)=>{
        this.messages.push(data);
      })
    this.chatService.getMessages(this.userId)
    .pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((data:any)=>{
        this.messages = data;
      })
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  onSubmit() {
    this.messages.push({message: this.chatForm.value.msg, sender: this.customerService.getCurrentValueCustomer()._id})
    this.chatService.sendMessage(this.chatForm.value.msg, this.userId);
    this.inputValue = '';
  }

}