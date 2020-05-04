import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-image-popover',
  templateUrl: 'image-popover.component.html'
})

export class ImagePopoverComponent implements OnInit {

  constructor(private alertCtrl: AlertController, private popoverCtrl: PopoverController) { }

  ngOnInit() { }

  async delete(){
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Seguro que desea eliminar esta imagen?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.popoverCtrl.dismiss({}, 'cancel')
          }
        }, {
          text: 'Eliminar',
          role: 'delete',
          handler: (value) => {
            this.popoverCtrl.dismiss({}, 'delete')
          }
        }
      ]
    });
    await alert.present();
  }
}