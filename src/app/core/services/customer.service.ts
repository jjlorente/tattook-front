import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CustomerService {
    private customerStore: BehaviorSubject<any> = new BehaviorSubject(null);
    readonly $customer: Observable<any> = this.customerStore.asObservable();

    constructor(
        private http: HttpClient,
        private toast: ToastController,
        public sanitizer: DomSanitizer
    ) { }
      
    clearStore(){
      this.customerStore.next(null)
    }

    getCustomer(){
        this.http.get(environment.apiUrl+'/user')
            .pipe(
                map((res: any) => {
                    if(res[0].picture && res[0].picture.length){
                        res[0].picture = this.sanitizer.bypassSecurityTrustUrl(res[0].picture)
                    }
                    return res[0]
                })
            ).subscribe((res)=>{
                this.customerStore.next(res);
            })
    }

    setCustomerProfile(user){
        this.http.put(environment.apiUrl+'/user',user)
            .subscribe((res)=>{
                this.getCustomer()
            })
    }
}