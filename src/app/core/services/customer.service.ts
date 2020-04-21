import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class CustomerService {

    constructor(
        private http: HttpClient,
        private toast: ToastController,
    ) { }

    getCustomer(){
        return this.http.get(environment.apiUrl+'/user')
    }
}