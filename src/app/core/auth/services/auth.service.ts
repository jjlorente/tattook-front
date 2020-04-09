import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform, ToastController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
    
  constructor(private http: HttpClient, private googlePlus: GooglePlus, private toast: ToastController) { }
    
  async loginWithGoogle(){
    const resGoogle = await this.googlePlus.login({})
    console.log(resGoogle);
    this.http.post(environment.apiUrl+'/login', {
      name: resGoogle.displayName,
      email: resGoogle.email,
      provider_id: resGoogle.userId,
      provider: "google",
      picture: resGoogle.imageUrl
    }).subscribe(res => {
      console.log(res)
    }, async (err) => {
      const toast = await this.toast.create({message:'Error al hacer login.', color: 'danger', duration: 5000})
      toast.present();
    })
  }

  isAuthenticated(){
    return localStorage.getItem("token");
  }

}