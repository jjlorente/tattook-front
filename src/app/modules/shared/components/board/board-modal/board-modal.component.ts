import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { PopoverCrudComponent } from 'src/app/modules/shared/components/popover-crud/popover-crud.component';
import { PortfolioService } from 'src/app/modules/gallery/services/portfolio.service';

@Component({
  selector: 'board-modal',
  templateUrl: 'board-modal.component.html',
  styleUrls: ['board-modal.component.scss']
})

export class BoardModalComponent implements OnInit {
  @Input('portfolioName') portfolioName:any;  
  @Input('portfolioId') portfolioId:any;
  @Input('works') works

  constructor(
    private modalCtrl: ModalController,
    public popoverController: PopoverController,
    public portfolioService: PortfolioService) { }

  ngOnInit() { 
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

  async close(){
    await this.modalCtrl.dismiss();
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
}