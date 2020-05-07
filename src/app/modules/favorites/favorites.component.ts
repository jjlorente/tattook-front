import { FavoriteService } from './../shared/services/favorite.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { WorkModalComponent } from '../shared/components/work-modal/work-modal.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  status: any;
  tattoos: any;

  constructor(
    private modalCtrl: ModalController,
    public favoriteService: FavoriteService
  ) { }

  ngOnInit() {
    this.favoriteService.$tattoos
      .subscribe(res => this.tattoos = res);
    this.status = 'tattoos';
  }

  ionViewWillEnter(){
    this.favoriteService.getAllTattoos('picture');
    this.status = 'tattoos';
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
      });
  }
}
