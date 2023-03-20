import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../shared/services/location.service';

@Component({
  selector: 'address-form',
  templateUrl: 'address-form.component.html',
  styleUrls: ['address-form.component.scss']
})

export class AddressFormComponent implements OnInit {
  address = '';
  addressInput = '';
  location = {lng: null, lat: null};

  constructor(private locationService: LocationService) { }

  ngOnInit() {}

  onAddressSelected(data){
    this.address = data.address;
    this.location = data.location;
  }

}