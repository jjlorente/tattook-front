import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:any;

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    public customerService: CustomerService) { }

  ngOnInit() { }

  ionViewWillEnter(){
    this.customerService.getCustomer();
    this.customerService.$customer
      .subscribe(user=> this.user = user)
  }

  async onClickMenu(){
    this.menuCtrl.toggle('profileMenu');
  }

  async logoutButton(){
    this.authService.logOut();
  }
}