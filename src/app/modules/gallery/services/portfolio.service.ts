import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

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
        console.log(portfolios)
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
    return this.http.delete(environment.apiUrl+'/portfolio/'+id)
      .pipe(
        tap((res)=>{
          this.getPortfolios();
        })
      )
  }

  editPortfolio(id, name){
    return this.http.put(environment.apiUrl+'/portfolio/'+id, {name})
      .pipe(
        tap(res=>this.getPortfolios())
      )
  }

}