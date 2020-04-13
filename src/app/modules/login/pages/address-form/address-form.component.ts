import { Component, OnInit, ViewChild, AfterContentInit, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform, ToastController } from '@ionic/angular';

import { AuthService } from 'src/app/core/auth/services/auth.service';


declare const google;
@Component({
  selector: 'address-form',
  templateUrl: 'address-form.component.html',
  styleUrls: ['address-form.component.scss']
})

export class AddressFormComponent implements OnInit, AfterContentInit {
  @ViewChild('addressInput', { static:true }) addressInput;

  address: string;
  location = {lng: null, lat: null};

  constructor(
    private geolocation: Geolocation,
    private ngZone: NgZone,
    private platform: Platform,
    private toast: ToastController,
    private authService: AuthService) { }

  ngOnInit() { }

  ngAfterContentInit(){
    this.getPlaceAutocomplete();
  }

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  
  onAddressInputChange(event){
    this.address = null;
    this.location.lat = null;
    this.location.lng = null;
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement,
      {
        componentRestrictions: { country: 'ES' },
        setFields: ['geometry', 'formatted_address']
        // types: 'address'  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if(place){
          this.ngZone.run(()=>{  
            this.address = place.formatted_address;
            this.location.lat = place.geometry.location.lat();
            this.location.lng = place.geometry.location.lng();
          })
          console.log(place)
          console.log(this.address, this.location)
        }
    });
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