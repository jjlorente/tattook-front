import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MenuController, ModalController, IonRouterOutlet } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { PortfolioService } from '../gallery/services/portfolio.service';
import { EditProfileModalComponent } from './components/edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @Input() userId = null;

  slidesOpts = {
    slidesPerView:1.25,
    spaceBetween:5,
    setWrapperSize: true,
    centeredSlides: true
  }

  user:any;

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    public customerService: CustomerService,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    public portfolioService: PortfolioService) { }

  ngOnInit() { 
    this.customerService.$customer
      .subscribe(user=> {
        this.user = user;
      })
    this.customerService.$otherCustomer
      .subscribe(user=> {
        this.user = user;
      })
    
  }

  ionViewWillEnter(){
    this.customerService.getCustomer(this.userId).subscribe();
    if(!this.portfolioService.getPortfolioCurrentValue()){
      this.portfolioService.getPortfolios()
    }
  }

  ngOnDestroy() { }

  async onClickMenu(){
    this.menuCtrl.toggle('profileMenu');
  }

  async logoutButton(){
    this.authService.logOut();
  }
  async editPicture(){
    console.log("Edit Picture");
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
        'location': this.user.location,
        'picture': this.user.picture
      },
      cssClass: 'modal'
    });
    await modal.present();
  }

}