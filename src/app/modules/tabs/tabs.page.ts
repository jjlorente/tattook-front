import { Component } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {

  constructor(private googlePlus: GooglePlus) {}

  login(){
    this.googlePlus.login({})
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }
}
