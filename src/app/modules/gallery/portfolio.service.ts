import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class PortfolioService {

  private portfoliosStore: BehaviorSubject<any> = new BehaviorSubject(null);
  readonly $portfolios: Observable<any> = this.portfoliosStore.asObservable();

  constructor(private http: HttpClient) { }

  clearStore(){
    this.portfoliosStore.next(null)
  }

  getPortfolios(){
    this.http.get(environment.apiUrl+'/portfolio')
      .subscribe((portfolios)=>{
        this.portfoliosStore.next(portfolios);
      })
  }

  createPortfolio(name){
    this.http.post(environment.apiUrl+'/portfolio', {name})
      .subscribe((res)=>{
        this.getPortfolios();
      })
  }

  removePortfolio(id){
    this.http.delete(environment.apiUrl+'/portfolio/'+id)
      .subscribe((res)=>{
        this.getPortfolios();
      })
  }

}