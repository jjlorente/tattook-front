import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Injectable({providedIn: 'root'})
export class SocketService {
  constructor(private http: HttpClient, private socket: Socket, private authService: AuthService) { }

  initPrivateChanel(){
    this.socket.emit('joinPrivateChannel', {token: this.authService.getToken()}, ()=>{
      console.log('added to my private channel')
    })
  }

  leavePrivateChanel(){
    this.socket.emit('leavePrivateChannel', {token: this.authService.getToken()}, ()=>{
      console.log('leave to my private channel')
    })
  }
}