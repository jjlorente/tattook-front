import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe, throwError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, map, catchError, last, finalize } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({providedIn: 'root'})
export class PortfolioService {
  private percentDoneSubject: Subject<any> = new Subject();
  readonly $percentDone: Observable<any> = this.percentDoneSubject.asObservable();
  
  private portfoliosStore: BehaviorSubject<any> = new BehaviorSubject(null);
  readonly $portfolios: Observable<any> = this.portfoliosStore.asObservable();

  constructor(private http: HttpClient,public sanitizer: DomSanitizer) { }

  clearStore(){
    this.portfoliosStore.next(null)
  }

  getPortfolioCurrentValue(){
    return this.portfoliosStore.getValue();
  }

  getPortfolios(userId = null) {
    let path = '';
    if(userId){
      path = '/user/'+ userId;
    }
    this.http.get(environment.apiUrl+'/portfolio' + path)
      .pipe(
        map(async (res:any)=>{
          const allWorks = res.map(async (portfolio)=>{return this.getWorks(portfolio._id, 4).toPromise()})
          let works:any = await Promise.all(allWorks);
          return res.map((port, index)=>{ return {...port, works: works[index]}})
        })
      ).subscribe(async (portfoliosPromise)=>{
        let portfolios = await portfoliosPromise;
        this.portfoliosStore.next(portfolios);
      })
  }

  createPortfolio(name){
    this.http.post(environment.apiUrl+'/portfolio', {name})
      .subscribe((res)=>this.getPortfolios())
  }

  removePortfolio(id){
    return this.http.delete(environment.apiUrl+'/portfolio/'+id)
      .pipe(
        tap((res)=>this.getPortfolios())
      )
  }

  editPortfolio(id, name){
    return this.http.put(environment.apiUrl+'/portfolio/'+id, {name})
      .pipe(
        tap(res=>this.getPortfolios())
      )
  }

  addNewImage(image, dataType, idPortfolio) {
    const req = new HttpRequest('POST', environment.apiUrl+'/portfolio/'+idPortfolio+'/image', {image, dataType}, {
      reportProgress: true
    });
    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event)),
      tap(message => this.percentDoneSubject.next(message)),
      last(),
      finalize(()=>this.getPortfolios()),
      catchError((error)=>{return throwError(error)}))
  }
  private getEventMessage(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return percentDone;
    }
  }

  getWorks(portfolioId, limit = 30){
    return this.http.get(environment.apiUrl+'/portfolio/'+portfolioId+'/image?limit='+limit)
  }
}