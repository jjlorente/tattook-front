import { FavoriteService } from './../../services/favorite.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, PopoverController } from '@ionic/angular';
import { ImagePopoverComponent } from '../image-popover/image-popover.component';
import { WorkService } from './work.service';
import { PortfolioService } from 'src/app/modules/gallery/services/portfolio.service';

@Component({
  selector: 'app-work-modal',
  templateUrl: 'work-modal.component.html',
  styleUrls: ['work-modal.component.scss']
})

export class WorkModalComponent implements OnInit {
  @Input() thumb;
  @Input() portfolioId;
  @Input() user;
  @Input() work;
  @Input() likes;
  @Input() liked;
  constructor(
    private workService: WorkService,
    private portfolioService: PortfolioService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private popoverController: PopoverController,
    private favoriteService: FavoriteService) { }

  ngOnInit() { 
    console.log(this.thumb);
    console.log(this.user);
    console.log(this.work);
  }

  ionViewWillEnter(){

  }

  async close(event: string = null) {
    await this.modalCtrl.dismiss(event);
  }

  async likePicture() {
    this.liked = true;
    this.favoriteService.addLike('picture', this.work._id)
      .subscribe(res=>{
        this.likes++;
      });
  }

  async deleteLikePicture(){
    this.liked = false;
    this.favoriteService.deleteLike('picture', this.work._id)
      .subscribe(res=>{
        this.likes--;
      });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ImagePopoverComponent,
      event: ev,
      translucent: true
    });
    popover.onDidDismiss()
      .then((res)=>{
        if(res.role === 'delete') {
          this.deleteImage();
        }
      })
    await popover.present();
  }

  async deleteImage() {
    this.workService.deleteWork(this.portfolioId, this.thumb._id_picture)
    .subscribe((res)=>{
      this.close('delete');
    })
  }
}