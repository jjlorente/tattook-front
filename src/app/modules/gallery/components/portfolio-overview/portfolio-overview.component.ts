import { Component, OnInit, Input } from '@angular/core';
import { BoardModalComponent } from '../board-modal/board-modal.component';
import { IonRouterOutlet } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PortfolioService } from '../../services/portfolio.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-portfolio-overview',
  templateUrl: 'portfolio-overview.component.html',
  styleUrls:['portfolio-overview.component.scss']
})

export class PortfolioOverviewComponent implements OnInit {
  @Input('portfolioName') portfolioName:any;
  @Input('portfolioId') portfolioId:any;
  @Input('works') works:any = [];

  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalCtrl: ModalController,
    private portfolioService: PortfolioService) { }

  ngOnInit() { }

  async openBoard(){
    const modal = await this.modalCtrl.create({
      component: BoardModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        'portfolioName': this.portfolioName,
        'portfolioId': this.portfolioId,
        'works': this.works
      },
      cssClass: 'modal'
    });
    await modal.present();
  }
}