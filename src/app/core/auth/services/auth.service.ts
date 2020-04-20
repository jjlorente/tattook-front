import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

import { AuthService as SocialWebLoginService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
 

@Injectable({providedIn: 'root'})
export class AuthService {
  
  private isLogin: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuthenticated());

  readonly $isLogin = this.isLogin.asObservable();

  loginState:boolean;

  constructor(
    private http: HttpClient,
    private googlePlus: GooglePlus,
    private toast: ToastController,
    private socialWebLoginService: SocialWebLoginService,
    private platform: Platform
  ) { }
    
  async loginWithGoogle(role, location = null, address = null){
    let resGoogle;
    if(this.platform.is('cordova')){
      resGoogle = await this.googlePlus.login({})
    } else {
      resGoogle = await this.socialWebLoginService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    let postObject: any = {
      name: resGoogle.displayName ? resGoogle.displayName : resGoogle.name,
      email: resGoogle.email,
      provider_id: resGoogle.userId ? resGoogle.userId : resGoogle.id,
      provider: "google",
      picture: resGoogle.imageUrl ? resGoogle.imageUrl : resGoogle.photoUrl,
      role: role
    };
    if(location) postObject.location = location;
    if(address) postObject.address = address;

    this.http.post(environment.apiUrl+'/login', postObject)
      .subscribe((res:any) => {
        this.setToken(res.token);
        this.isLogin.next(true);
      }, async (err) => {
        const toast = await this.toast.create({message:'Error al hacer login.', color: 'danger', duration: 5000})
        toast.present();
      })
  }

  logOut(){
    localStorage.removeItem("token");
    this.isLogin.next(false);
  }

  private setToken(token: any) {
    localStorage.setItem("token", JSON.stringify(token))
  }

  getToken(){
    return JSON.parse(localStorage.getItem("token"));
  }

  isAuthenticated():boolean{
    this.loginState = localStorage.getItem("token")? true : false;
    return localStorage.getItem("token")? true : false;
  }

}