import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform, ToastController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  
  private isLogin: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuthenticated());

  readonly $isLogin = this.isLogin.asObservable();

  constructor(private http: HttpClient, private googlePlus: GooglePlus, private toast: ToastController) { }
    
  async loginWithGoogle(role, location = null, address = null){
    const resGoogle = await this.googlePlus.login({})
    let postObject: any = {
      name: resGoogle.displayName,
      email: resGoogle.email,
      provider_id: resGoogle.userId,
      provider: "google",
      picture: resGoogle.imageUrl,
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
    // return localStorage.getItem("token")? true : false;
    return true;
  }

}