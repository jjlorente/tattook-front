import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { LocationService } from '../../../shared/services/location.service';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-address-input',
  templateUrl: 'search-address-input.component.html',
  styleUrls: ['search-address-input.component.scss']
})

export class SearchAddressInputComponent implements OnInit {
  @ViewChild('formContainer', {static: true}) formContainer;
  @Input() addressInput;
  @Output() onAddressSelected: EventEmitter<any> = new EventEmitter();

  $inputText:Subject<string> = new Subject();
  address = '';
  location = {lng: null, lat: null};
  predictions = [];
  bottomPosition:any;
  predictionListStyles:any = {}
  placeSelected = false;

  constructor(private locationService: LocationService) { }

  ngOnInit() { 
    if(this.addressInput && this.addressInput.length){
      this.address = this.addressInput;
      this.placeSelected = true;
    }
    this.$inputText
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((inputValue:any) => {
          this.onAddressInputChange(inputValue)
          return inputValue
        })
      ).subscribe((res)=>{
        console.log(this.address, this.addressInput)
        if(this.addressInput !== this.address){
        this.placeSelected = false;
          this.address = '';
          this.location.lat = null;
          this.location.lng = null;
          this.onAddressSelected.emit({
            address: this.address,
            location: this.location,
            addressInput: this.addressInput
          });
        }
      });
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
        this.onAddressSelected.emit({
          address: this.address,
          location: this.location,
          addressInput: this.addressInput
        });
      })
  }

  onKeyUpInput($event){
    this.$inputText.next($event.target.value)
  }
  
  onFocusChange(event){
    setTimeout(() => {
      this.predictionListStyles.top = this.formContainer.nativeElement.getBoundingClientRect().bottom + 'px';
      this.predictionListStyles.width =  this.formContainer.nativeElement.getBoundingClientRect().width + 'px';
    },300);
  }
}