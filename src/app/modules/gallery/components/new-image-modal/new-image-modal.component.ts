import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ModalController, AlertController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'new-image-modal',
  templateUrl: 'new-image-modal.component.html',
  styleUrls: ['new-image-modal.component.scss']
})

export class NewImageModalComponent implements OnInit {
  @Input('image') image:any;
  @Input('dataType') dataType:any;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public portfolioService: PortfolioService,
    public sanitizer: DomSanitizer) { }

  ngOnInit() { }

  saveImage(board) {
    this.portfolioService.addNewImage(this.image, this.dataType, board._id)
      .subscribe(res=>this.modalCtrl.dismiss())
  }

  async close(){
    await this.modalCtrl.dismiss();
  }
}