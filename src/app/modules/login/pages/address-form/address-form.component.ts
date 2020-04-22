import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationService } from '../../../shared/services/location.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'address-form',
  templateUrl: 'address-form.component.html',
  styleUrls: ['address-form.component.scss']
})

export class AddressFormComponent implements OnInit {
  @ViewChild('formContainer', {static: true}) formContainer;

  $inputText:Subject<string> = new Subject();

  address = '';
  addressInput = '';
  location = {lng: null, lat: null};
  predictions = [];
  bottomPosition:any;
  predictionListStyles:any = {}
  placeSelected = false;


  constructor(
    private geolocation: Geolocation,
    private locationService: LocationService,
    public loadingService: LoadingService) { }

  ngOnInit() { 
    this.$inputText
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((inputValue:any) => {
          this.onAddressInputChange(inputValue)
          return inputValue
        })
      ).subscribe((res)=>{
        if(this.addressInput !== this.address){
          this.address = null;
          this.location.lat = null;
          this.location.lng = null;
        }
      });
  }

  onKeyUpInput($event){
    this.$inputText.next($event.target.value)
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
}