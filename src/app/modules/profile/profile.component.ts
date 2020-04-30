import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, IonRouterOutlet } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { EditProfileModalComponent } from './components/edit-profile-modal/edit-profile-modal.component';
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
    public customerService: CustomerService,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet) { }

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

  async openEditProfile() {
    const modal = await this.modalCtrl.create({
      component: EditProfileModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        'userId': this.user._id,
        'username': this.user.name,
        'description': this.user.description,
        'address': this.user.full_address,
        'picture': this.user.picture
      },
      cssClass: 'modal'
    });
    await modal.present();
  }

}