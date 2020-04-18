import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
    selector: 'login-page',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
  constructor() {}
  ngOnInit(){}
}