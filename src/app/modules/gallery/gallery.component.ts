import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './services/portfolio.service';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NewImageModalComponent } from './components/new-image-modal/new-image-modal.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(
    public portfolioService: PortfolioService,
    private alertCtrl: AlertController,
    private camera: Camera,
    private routerOutlet: IonRouterOutlet,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.portfolioService.getPortfolios()
  }
  
  ionViewWillEnter(){
    this.portfolioService.$percentDone.subscribe((percent)=>{
      console.log(percent,'%')
    })
    if(!this.portfolioService.getPortfolioCurrentValue()){
      this.portfolioService.getPortfolios()
    }
  }
  
  async presentNewPortfolioModal() {
    const alert = await this.alertCtrl.create({
      header: 'Nuevo Portfolio',
      cssClass: 'alert-primary',
      inputs: [
        {
          name: 'portfolio',
          type: 'text',
          placeholder: 'Nombre del portfolio'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'app-secondary',
          handler: () => {}
        }, {
          cssClass: 'app-secondary',
          text: 'Crear',
          handler: (value) => {
            this.portfolioService.createPortfolio(value.portfolio)
          }
        }
      ]
    });
    
    await alert.present();
  }

  async onClickAddImage(){
    const alert = await this.alertCtrl.create({
      header: 'Añadir nueva imagen',
      cssClass:'alert-primary',
      buttons: [
        {
          text: 'Desde galería',
          role: 'gallery',
          cssClass: 'app-secondary',
          handler: () => {
            this.getPhoto(0)
          }
        }, {
          cssClass: 'app-secondary',
          role: 'camera',
          text: 'Desde Cámara',
          handler: (value) => {
            this.takePicture()
          }
        }
      ]
    });
    
    await alert.present();
  }
  
  takePicture(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.openNewImageModal(base64Image, 'base64')
    }, (err) => {
     // Handle error
    });
  }
  async getPhoto(sourceType:number) {
    const options: CameraOptions = {
      quality: 100,
      // targetHeight: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      allowEdit: true
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.openNewImageModal(base64Image, 'base64')
    }, (err) => {
      // Handle error
    });
  }

  async openNewImageModal(image, dataType){
    const modal = await this.modalCtrl.create({
      component: NewImageModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        'image': image,
        'dataType': dataType
      },
      cssClass: 'modal'
    });
    await modal.present();
  }

}
