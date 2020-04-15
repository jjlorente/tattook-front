import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LocationService {

  private sessionToken = '';

  private predictions: Array<any> = [];

  constructor(private http: HttpClient) { }

  clearTokenSession(){
    this.sessionToken = '';
  }

  getNewSessionToken() {
    let newToken = '';
    var array = new Uint32Array(10);
    window.crypto.getRandomValues(array);
    array.forEach(num=>{
      newToken += num;
    })
    return newToken;
  }

  getPlaceDetail(placeId){
    return this.http.get(environment.apiUrl + '/location/detail/'+placeId+'&sessionToken='+this.sessionToken)
  }

  getAutocompletePredictions(input: string){
    if(!this.sessionToken.length){
      this.sessionToken = this.getNewSessionToken();
    }
    return this.http.get(environment.apiUrl + '/location/autocomplete?input='+input+'&sessionToken='+this.sessionToken)
      .pipe(
        tap((res:any) => {
          this.predictions = res.predictions;
        })
      )
  }
  
}