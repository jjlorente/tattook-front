import { WorkService } from './../shared/components/work-modal/work.service';
import { PortfolioService } from 'src/app/modules/gallery/services/portfolio.service';
import { Component, OnInit } from '@angular/core';
import { WorkModalComponent } from '../shared/components/work-modal/work-modal.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
})
export class WallComponent implements OnInit {
  works:any;
  constructor(
    public workService: WorkService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.workService.$works
      .subscribe(res=>this.works=res);
  }

  ionViewWillEnter(){
    this.workService.getAllWorks();
  }

  async openBoard(work, user, thumb, likes, liked){
    const modal = await this.modalCtrl.create({
      component: WorkModalComponent,
      swipeToClose: true,
      cssClass: 'modal',
      componentProps: {
        'thumb': thumb,
        // 'portfolioId': this.portfolioId,
        'work': work,
        'user': user,
        'likes': likes,
        'liked': liked
      },
    });
    await modal.present();
    modal.onWillDismiss()
      .then(res=>{
        this.workService.getAllWorks();
      })
  }
}
