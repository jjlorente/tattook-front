import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe, throwError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, map, catchError, last, finalize } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FavoriteService {

    constructor(private http: HttpClient) { };

    addLike(type, itemID) {
        console.log(type);
        console.log(itemID);
        return this.http.post(environment.apiUrl + '/favorite', {type, itemID});
    }
}