import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { CustomerService } from 'src/app/core/services/customer.service';
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

  ngOnInit() { 
    this.customerService.$customer
      .subscribe(user=> {
        this.user = user;
      })
  }

  ionViewWillEnter(){
    this.customerService.getCustomer();
  }

  async onClickMenu(){
    this.menuCtrl.toggle('profileMenu');
  }

  async logoutButton(){
    this.authService.logOut();
  }
}