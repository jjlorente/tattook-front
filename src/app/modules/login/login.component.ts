import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
    selector: 'login-page',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
  constructor(
    private platform: Platform,
    private toast: ToastController,
    private authService: AuthService) {}

  ngOnInit(){}

  async loginWithGoogle(){
    if(this.platform.is("cordova")){
      this.authService.loginWithGoogle('client');
    } else {
      const toast = await this.toast.create({
        message: "Solo disponible en app móvil.",
        color: "danger",
        duration: 5000
      })
      toast.present();
    }
  }

  loginAsArtist(){
    
  }
}