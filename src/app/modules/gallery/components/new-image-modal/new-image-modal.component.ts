import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { loadingController } from '@ionic/core';

@Component({
  selector: 'new-image-modal',
  templateUrl: 'new-image-modal.component.html',
  styleUrls: ['new-image-modal.component.scss']
})

export class NewImageModalComponent implements OnInit {
  @Input('image') image:any;
  @Input('dataType') dataType:any;
  description:any;
  loading:any;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public portfolioService: PortfolioService,
    private toast: ToastController,
    public sanitizer: DomSanitizer,
    public loadingController: LoadingController) { }

  ngOnInit() { }
  
  saveImage(board) {
    this.loadingButtonClick();
    this.portfolioService.addNewImage(this.image, this.dataType, this.description, board._id)
      .subscribe(
        res =>{ 
          this.dismissLoading();
          this.modalCtrl.dismiss();
        },async (err)=>{
          this.dismissLoading();
          const toast = await this.toast.create({message:'Error al hacer login.', color: 'danger', duration: 5000})
          toast.present();
        })
  }

  async close(){
    await this.modalCtrl.dismiss();
  }

  async loadingButtonClick() {
    this.loading = await loadingController.create({
      message: 'Subiendo foto...'
    });
    await this.loading.present();
  }

  async dismissLoading(){
    this.loading.dismiss();
  }
}