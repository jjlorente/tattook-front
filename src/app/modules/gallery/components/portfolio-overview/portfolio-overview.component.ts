import { Component, OnInit, Input } from '@angular/core';
import { BoardModalComponent } from '../board-modal/board-modal.component';
import { IonRouterOutlet } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-portfolio-overview',
  templateUrl: 'portfolio-overview.component.html'
})

export class PortfolioOverviewComponent implements OnInit {
  @Input('portfolio') portfolio:any;

  constructor(private routerOutlet: IonRouterOutlet, private modalCtrl: ModalController) { }

  ngOnInit() { }

  async openBoard(id, name){
    const modal = await this.modalCtrl.create({
      component: BoardModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        'name': name,
        'id': id
      },
      cssClass: 'modal'
    });
    await modal.present();
  }
}