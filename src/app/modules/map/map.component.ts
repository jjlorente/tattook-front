import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  LatLng
} from '@ionic-native/google-maps';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OtherProfileComponent } from '../shared/components/other-profile/other-profile.component';
declare const google;
@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss']
})

export class MapComponent implements OnInit, AfterViewInit {
  map: GoogleMap;

  me:any={};

  constructor(
    private customerService:CustomerService,
    private geolocation: Geolocation,
    private router: Router,
    private modalCtrl: ModalController) { }

  ngOnInit() { }

  ngAfterViewInit(){
    this.me = this.customerService.getCurrentValueCustomer()
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.loadMap({lat: resp.coords.latitude, lng: resp.coords.longitude})
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  ionViewDidLoad() {
  }

  loadMap(location) {
    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyA6YymogsUhOk1gywo1R7TKzxHx-qyiRCg',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyA6YymogsUhOk1gywo1R7TKzxHx-qyiRCg'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: location.lat, //this.me.location.coordinates[1],
           lng: location.lng  //this.me.location.coordinates[0]
         },
         zoom: 15,
        //  tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then((event)=>{
        this.customerService.getCustomerList()
          .subscribe((users:any)=>{
            users.forEach((user)=>{
              this.addMarker(user)
            })
          })
      })
  }

  addMarker(user){
    let markerOptions: MarkerOptions = {
      position: new LatLng(user.location.coordinates[1], user.location.coordinates[0]),
      title: user.name,
      icon: { url : user.picture }
    };
    let marker: Marker = this.map.addMarkerSync(markerOptions);
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      this.openOtherProfile(user)
    });
    
  }

  async openOtherProfile(user){
    let me = this.customerService.getCurrentValueCustomer()
    if(me._id === user._id) {
      this.router.navigate(['/tabs/profile'])
    } else {
      const modal = await this.modalCtrl.create({
        component: OtherProfileComponent,
        swipeToClose: true,
        componentProps: {
          'user': user 
        },
        cssClass: 'modal'
      });
      await modal.present();
    }
    
  }

}