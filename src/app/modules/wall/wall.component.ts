import { WorkService } from './../shared/components/work-modal/work.service';
import { PortfolioService } from 'src/app/modules/gallery/services/portfolio.service';
import { Component, OnInit } from '@angular/core';
import { WorkModalComponent } from '../shared/components/work-modal/work-modal.component';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { OtherProfileComponent } from '../shared/components/other-profile/other-profile.component';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
})
export class WallComponent implements OnInit {
  works:any;
  constructor(
    public workService: WorkService,
    private modalCtrl: ModalController,
    public router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.workService.$works
      .subscribe(res=>this.works=res);
  }

  ionViewWillEnter(){
    this.workService.getAllWorks();
  }

  async openWork(work, user, thumb, likes, liked){
    const modal = await this.modalCtrl.create({
      component: WorkModalComponent,
      swipeToClose: true,
      cssClass: 'modal',
      componentProps: {
        'thumb': thumb,
        // 'portfolioId': this.portfolioId,
        'work': work,
        'user': user,
        'likes': likes,
        'liked': liked
      },
    });
    await modal.present();
    modal.onDidDismiss()
      .then(res=>{
        if(res.data === 'other-profile'){
          this.openOtherProfile(user);
        } else {
          this.workService.getAllWorks();
        }
      })
  }

  async openOtherProfile(user){
    let me = this.customerService.getCurrentValueCustomer()
    if(me._id === user._id) {
      this.router.navigate(['/tabs/profile'])
    } else {
      const modal = await this.modalCtrl.create({
        component: OtherProfileComponent,
        swipeToClose: true,
        componentProps: {
          'user': user 
        },
        cssClass: 'modal'
      });
      await modal.present();
    }
    
  }
}
