import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoadingService {
  private loading: boolean = false;
  constructor() { }
  setStateLoading(state:boolean){
    this.loading = state;
  }
  isLoading(){
    return this.loading;
  }
}