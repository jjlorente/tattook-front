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

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    public customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomer()
    .subscribe((res:any) => {
      console.log(res);
    }, async (err) => {
        // const toast = await this.toast.create({message:'Error customer Info.', color: 'danger', duration: 5000})
        // toast.present();
    })
  }

  async onClickMenu(){
    this.menuCtrl.toggle('profileMenu');
  }

  async logoutButton(){
    this.authService.logOut();
  }
}