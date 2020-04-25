import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { PopoverCrudComponent } from 'src/app/modules/shared/components/popover-crud/popover-crud.component';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'board-modal',
  templateUrl: 'board-modal.component.html',
  styleUrls: ['board-modal.component.scss']
})

export class BoardModalComponent implements OnInit, AfterViewInit {
  @Input('id') id: any;
  @Input('name') name: any;

  constructor(
    private modalCtrl: ModalController,
    public popoverController: PopoverController,
    private portfolioService: PortfolioService) { }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverCrudComponent,
      event: ev,
      componentProps:{
        'name': this.name
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

  ngOnInit() { }

  ngAfterViewInit(){
  }

  async close(){
    await this.modalCtrl.dismiss();
  }

  editBoard(name){
    this.portfolioService.editPortfolio(this.id, name)
      .subscribe((res=>this.close()))
  }

  deleteBoard(){
    this.portfolioService.removePortfolio(this.id)
    .subscribe((res)=>{
      this.close();
    })
  }
}