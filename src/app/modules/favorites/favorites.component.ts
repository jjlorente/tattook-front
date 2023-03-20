import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';
import { FavoriteService } from './../shared/services/favorite.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { WorkModalComponent } from '../shared/components/work-modal/work-modal.component';
import { OtherProfileComponent } from '../shared/components/other-profile/other-profile.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  status: any;
  tattoos: any;
  users: any;
  constructor(
    private modalCtrl: ModalController,
    public favoriteService: FavoriteService,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.favoriteService.$tattoos
      .subscribe(res => this.tattoos = res);

    this.favoriteService.$users
      .subscribe(res => this.users = res);
    this.status = 'tattoos';

    console.log(this.users)
  }

  ionViewWillEnter(){
    this.status = 'tattoos';
    this.favoriteService.getAllTattoos('picture');
    this.favoriteService.getAllUsers('artist');
    console.log(this.users)
  }

  async onChange(e){
    this.status = e.detail.value;
  }

  async openBoard(work, user, thumb, likes, liked){
    const modal = await this.modalCtrl.create({
      component: WorkModalComponent,
      swipeToClose: true,
      cssClass: 'modal',
      componentProps: {
        'thumb': thumb,
        'work': work,
        'user': user,
        'likes': likes,
        'liked': liked
      },
    });
    await modal.present();
    modal.onWillDismiss()
      .then(res => {
        this.favoriteService.getAllTattoos('picture');
        if(res.data === 'other-profile'){
          let me = this.customerService.getCurrentValueCustomer()
          if(me._id === user._id) {
            this.router.navigate(['/tabs/profile'])
          } else {
            this.openOtherProfile(user);
          }
        }
    })
  }

  async openOtherProfile(user){
    const modal = await this.modalCtrl.create({
      component: OtherProfileComponent,
      swipeToClose: true,
      componentProps: {
        'user': user 
      },
      cssClass: 'modal'
    });
    await modal.present();
    modal.onWillDismiss()
      .then(res => {
        this.favoriteService.getAllUsers('artist');
    })
  }
}
