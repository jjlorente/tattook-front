import { Component, OnInit, Input } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-google-login-button',
  templateUrl: 'google-login-button.component.html',
  styleUrls: ['google-login-button.component.scss']
})

export class GoogleLoginButtonComponent implements OnInit {
  @Input() role:string = null;
  @Input() isDisabled: boolean = false;
  @Input() location:any = null;
  @Input() address:string = null

  constructor(private platform: Platform,
    private toast: ToastController,
    private authService: AuthService,
    public loadingService: LoadingService) { }

  ngOnInit() { }

  async loginWithGoogle(){
    if(this.platform.is("cordova")){
      this.authService.loginWithGoogle(this.role, this.location, this.address);
    } else {
      const toast = await this.toast.create({
        message: "Solo disponible en app móvil.",
        color: "danger",
        duration: 5000
      })
      toast.present();
    }
  }
}