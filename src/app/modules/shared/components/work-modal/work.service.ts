import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class WorkService {
  constructor(private http: HttpClient) { }

  deleteWork(portfolioId, workId){
    return this.http.delete(environment.apiUrl+'/portfolio/'+portfolioId+'/image/'+workId)
      .pipe(
        finalize(()=>{})
      )
  }
  
}