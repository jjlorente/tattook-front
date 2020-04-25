import { Component, OnInit, Input, Output } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'popover-crud',
  templateUrl: 'popover-crud.component.html'
})

export class PopoverCrudComponent implements OnInit {
  @Input() name:any;

  constructor(private alertCtrl: AlertController, private popoverCtrl: PopoverController) { }

  ngOnInit() { }

  async update(){
    const alert = await this.alertCtrl.create({
      header: 'Modificar',
      inputs: [
        {
          name: 'item',
          type: 'text',
          placeholder: 'Nombre del portfolio',
          value: this.name
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.popoverCtrl.dismiss({}, 'cancel')
          }
        }, {
          text: 'Aceptar',
          handler: (value) => {
            this.popoverCtrl.dismiss({value:value.item}, 'update')
          }
        }
      ]
    });

    await alert.present();
  }

  async delete(){
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Seguro que desea eliminar <strong>'+this.name+'</strong>?',
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