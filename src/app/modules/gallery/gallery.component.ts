import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './services/portfolio.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(public portfolioService: PortfolioService, private alertCtrl: AlertController) { }

  ngOnInit() { }
  
  ionViewWillEnter(){
    this.portfolioService.getPortfolios()
  }
  
  async presentNewPortfolioModal() {
    const alert = await this.alertCtrl.create({
      header: 'Nuevo Portfolio',
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
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Crear',
          handler: (value) => {
            this.portfolioService.createPortfolio(value.portfolio)
          }
        }
      ]
    });

    await alert.present();
  }

}
