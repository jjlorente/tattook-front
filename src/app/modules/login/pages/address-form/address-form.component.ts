import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'address-form',
  templateUrl: 'address-form.component.html',
  styleUrls: ['address-form.component.scss']
})

export class AddressFormComponent implements OnInit {
  constructor(private geolocation: Geolocation) { }

  ngOnInit() { }

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}