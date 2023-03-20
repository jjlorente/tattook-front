import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ChatService {

  constructor(private http: HttpClient, private socket: Socket, private authService: AuthService) { }
  
  sendMessage(message, userId) {
    this.socket.emit('new-message', {message, to: userId, token: this.authService.getToken()});
  }

  getSocketMessages() {
    return Observable.create((observer) => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
  }

  getMessages(userId){
    return this.http.get(environment.apiUrl+'/chat/messages/'+userId)
  }

  getChatList(){
    return this.http.get(environment.apiUrl+'/chat')
  }

}