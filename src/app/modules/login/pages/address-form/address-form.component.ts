import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform, ToastController } from '@ionic/angular';

import { AuthService } from 'src/app/core/auth/services/auth.service';
import { LocationService } from '../../../shared/services/location.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

declare const google;
@Component({
  selector: 'address-form',
  templateUrl: 'address-form.component.html',
  styleUrls: ['address-form.component.scss']
})

export class AddressFormComponent implements OnInit {
  @ViewChild('input', {static: true}) input;
  @ViewChild('formContainer', {static: true}) formContainer;

  address = '';
  addressInput = '';
  location = {lng: null, lat: null};
  predictions = [];
  bottomPosition:any;
  predictionListStyles:any = {}
  placeSelected = false;


  constructor(
    private geolocation: Geolocation,
    private platform: Platform,
    private toast: ToastController,
    private authService: AuthService,
    private locationService: LocationService) { }

  ngOnInit() { }

  ngAfterViewInit(){
    this.input.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      ).subscribe(inputValue => {
        this.onAddressInputChange(inputValue)
      })
  }

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  
  onFocusChange(event){
    setTimeout(() => {
      this.predictionListStyles.top = this.formContainer.nativeElement.getBoundingClientRect().bottom + 'px';
      this.predictionListStyles.width =  this.formContainer.nativeElement.getBoundingClientRect().width + 'px';
    },300);
  }

  onKeyUp(){
    if(this.addressInput !== this.address){
      this.address = null;
      this.location.lat = null;
      this.location.lng = null;
    }
  }

  onAddressInputChange(value){
    if(!value.length){
      this.predictions = [];
    } else {
      if(!this.predictionListStyles.top || this.predictionListStyles.top !== this.formContainer.nativeElement.getBoundingClientRect().bottom + 'px')
        this.predictionListStyles.top = this.formContainer.nativeElement.getBoundingClientRect().bottom + 'px';
      if(!this.predictionListStyles.width ||  this.predictionListStyles.width !== this.formContainer.nativeElement.getBoundingClientRect().width + 'px')
        this.predictionListStyles.width =  this.formContainer.nativeElement.getBoundingClientRect().width + 'px';
      if(!this.placeSelected){
        this.locationService.getAutocompletePredictions(value)
          .subscribe(res => {
            this.predictions = res.predictions;
          })
      } else {
        this.placeSelected = false;
      }
    }
  }

  onClickAddress(address){
    this.locationService.getPlaceDetail(address.place_id)
      .subscribe((res: any) => {
        console.log(res)
        this.placeSelected = true;
        this.predictions = [];
        this.locationService.clearTokenSession();
        this.addressInput = res.result.formatted_address;
        this.address = res.result.formatted_address;
        this.location.lat = res.result.geometry.location.lat;
        this.location.lng = res.result.geometry.location.lng;
      })
  }

  async loginWithGoogle(){
    if(this.platform.is("cordova")){
      this.authService.loginWithGoogle('tattoo_artist', this.location, this.address);
    } else {
      const toast = await this.toast.create({
        message: "Solo disponible en app móvil.",
        color: "danger",
        duration: 5000
      })
      toast.present();
    }
  }

}