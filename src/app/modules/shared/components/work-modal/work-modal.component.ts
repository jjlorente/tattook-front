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
  constructor(
    private workService: WorkService,
    private portfolioService: PortfolioService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private popoverController: PopoverController) { }

  ngOnInit() { 
    console.log(this.thumb);
  }

  async close(event: string = null){
    await this.modalCtrl.dismiss(event);
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