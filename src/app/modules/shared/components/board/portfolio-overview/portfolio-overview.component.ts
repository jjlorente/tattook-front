import { Component, OnInit, Input } from '@angular/core';
import { BoardModalComponent } from '../board-modal/board-modal.component';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { PortfolioService } from 'src/app/modules/gallery/services/portfolio.service';

@Component({
  selector: 'app-portfolio-overview',
  templateUrl: 'portfolio-overview.component.html',
  styleUrls:['portfolio-overview.component.scss']
})

export class PortfolioOverviewComponent implements OnInit {
  @Input('portfolioName') portfolioName:any;
  @Input('portfolioId') portfolioId:any;
  @Input('works') works:any = [];
  @Input('user') user: any = {}

  constructor(
    // private routerOutlet: IonRouterOutlet,
    private modalCtrl: ModalController,
    private portfolioService: PortfolioService) { }

  ngOnInit() { }

  async openBoard(){
    const modal = await this.modalCtrl.create({
      component: BoardModalComponent,
      swipeToClose: true,
      // presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        'portfolioName': this.portfolioName,
        'portfolioId': this.portfolioId,
        'works': this.works,
        'user': this.user,
      },
      cssClass: 'modal'
    });
    await modal.present();
    modal.onWillDismiss()
      .then((res)=>{
        if(res.data){
          this.portfolioService.getPortfolios();
        }
      })
  }
}