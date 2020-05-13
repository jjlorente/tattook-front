import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './core/auth/services/auth.service';
import { Router } from '@angular/router';
import { CustomerService } from './core/services/customer.service';
import { SocketService } from './modules/shared/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService,
    public router: Router,
    private customerService: CustomerService,
    private socketService: SocketService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.$isLogin
        .subscribe(login => {
          if(login) {
              this.customerService.getCustomer()
                .subscribe((res)=>{
                  this.socketService.initPrivateChanel();
                  this.router.navigate(['/tabs'])
                })
          } else {
            this.router.navigate(['/login'])
          }
        })
    });
  }
}
