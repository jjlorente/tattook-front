import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CustomerService {
    private customerStore: BehaviorSubject<any> = new BehaviorSubject(null);
    readonly $customer: Observable<any> = this.customerStore.asObservable();

    private otherCustomerStore: BehaviorSubject<any> = new BehaviorSubject(null);
    readonly $otherCustomer: Observable<any> = this.otherCustomerStore.asObservable();

    constructor(
        private http: HttpClient,
        private toast: ToastController,
        public sanitizer: DomSanitizer
    ) { }
      
    clearStore(){
      this.customerStore.next(null)
    }

    getCurrentValueCustomer(){
      return this.customerStore.getValue()
    }

    getCustomer(userId = null) {
      let path = '';
      if(userId){
        path = '/'+ userId;
      }
      return this.http.get(environment.apiUrl+'/user' + path)
          .pipe(
              map((res: any) => {
                  if(res.picture && res.picture.length){
                      res.picture = this.sanitizer.bypassSecurityTrustUrl(res.picture)
                  }
                  return res
              }),
              tap(res=>{
                if(userId){
                  this.otherCustomerStore.next(res)
                } else {
                  this.customerStore.next(res);
                }
              })
          )
    }

    setCustomerProfile(user){
        this.http.put(environment.apiUrl+'/user',user)
            .subscribe((res)=>{
                this.getCustomer().subscribe()
            })
    }
}