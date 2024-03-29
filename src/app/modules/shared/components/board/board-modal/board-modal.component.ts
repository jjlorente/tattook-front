import { Component, OnInit, Input } from '@angular/core';
import { ModalController, PopoverController, IonRouterOutlet } from '@ionic/angular';
import { PopoverCrudComponent } from 'src/app/modules/shared/components/popover-crud/popover-crud.component';
import { PortfolioService } from 'src/app/modules/gallery/services/portfolio.service';
import { WorkModalComponent } from '../../work-modal/work-modal.component';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'board-modal',
  templateUrl: 'board-modal.component.html',
  styleUrls: ['board-modal.component.scss']
})

export class BoardModalComponent implements OnInit {
  @Input('portfolioName') portfolioName:any;  
  @Input('portfolioId') portfolioId:any;
  @Input('works') works;
  @Input('user') user;
  
  public me: any = {};

  refreshPortfoliosOnClose = false;

  constructor(
    private modalCtrl: ModalController,
    public popoverController: PopoverController,
    public portfolioService: PortfolioService,
    private customerService: CustomerService) { }

  ngOnInit() { 
    this.me = this.customerService.getCurrentValueCustomer()
    this.portfolioService.getWorks(this.portfolioId, 30)
      .subscribe((works)=>{
        this.works = works;
      })
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverCrudComponent,
      event: ev,
      componentProps:{
        'name': this.portfolioName
      },
      translucent: true
    });
    popover.onDidDismiss()
      .then((res)=>{
        if(res.role === 'delete') {
          this.deleteBoard();
        } else if(res.role === 'update') {
          this.editBoard(res.data.value);
        }
      })
    await popover.present();
  }

  async close(event:boolean = false){
    event = this.refreshPortfoliosOnClose;
    await this.modalCtrl.dismiss(event);
  }

  editBoard(name){
    this.portfolioService.editPortfolio(this.portfolioId, name)
      .subscribe((res=>this.close()))
  }

  deleteBoard(){
    this.portfolioService.removePortfolio(this.portfolioId)
    .subscribe((res)=>{
      this.close();
    })
  }

  async onClickWork(item){
    const modal = await this.modalCtrl.create({
      component: WorkModalComponent,
      swipeToClose: true,
      cssClass: 'modal',
      componentProps: {
        'thumb': item.thumb,
        'portfolioId': this.portfolioId,
        'user': item.user,
        'work': item.work,
        'likes': item.likes,
        'liked': item.liked
      },
    });
    await modal.present();
    modal.onWillDismiss()
      .then((res)=>{
        console.log('evento',res)
        if(res.data === 'delete'){
          this.refreshPortfoliosOnClose = true;
          this.portfolioService.getWorks(this.portfolioId, 30)
          .subscribe((works)=>{
            this.works = works;
          })
        }
      })
  }
}