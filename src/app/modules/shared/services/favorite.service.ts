import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe, throwError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, map, catchError, last, finalize } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FavoriteService {
    private tattoosStore: BehaviorSubject<any> = new BehaviorSubject(null);
    readonly $tattoos: Observable<any> = this.tattoosStore.asObservable();

    private usersStore: BehaviorSubject<any> = new BehaviorSubject(null);
    readonly $users: Observable<any> = this.usersStore.asObservable();

    constructor(private http: HttpClient) { }

    addLike(type, itemID) {
        return this.http.post(environment.apiUrl + '/favorite', {type, itemID});
    }

    deleteLike(type, itemID) {
        return this.http.delete(environment.apiUrl + '/favorite?type=' + type + '&itemID=' + itemID);
    }

    getAllTattoos(type) {
        this.http.get(environment.apiUrl + '/favorite?type=' + type)
        .subscribe((res) => {
            this.tattoosStore.next(res);
        });
    }

    getAllUsers(type) {
        this.http.get(environment.apiUrl + '/favorite/users?type=' + type)
        .subscribe((res) => {
            this.usersStore.next(res);
        });
    }
}