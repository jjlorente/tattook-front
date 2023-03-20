import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { BehaviorSubject, Observable, pipe, throwError, Subject } from 'rxjs';
import { tap, map, catchError, last, finalize } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({providedIn: 'root'})
export class WorkService {
  private worksStore: BehaviorSubject<any> = new BehaviorSubject(null);
  readonly $works: Observable<any> = this.worksStore.asObservable();

  constructor(private http: HttpClient,public sanitizer: DomSanitizer) { }

  deleteWork(portfolioId, workId){
    return this.http.delete(environment.apiUrl+'/portfolio/'+portfolioId+'/image/'+workId)
      .pipe(
        finalize(()=>{})
      )
  }

  getAllWorks(){
    this.http.get(environment.apiUrl+'/work')
    .subscribe((res)=>{
      console.log(res);
      this.worksStore.next(res);
    })
  }
}