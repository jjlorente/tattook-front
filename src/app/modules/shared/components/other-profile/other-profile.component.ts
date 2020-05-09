import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { PortfolioService } from '../../../gallery/services/portfolio.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.scss']
})
export class OtherProfileComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() user = null;

  ngUnsubscribe = new Subject()

  slidesOpts = {
    slidesPerView:1.25,
    spaceBetween:5,
    setWrapperSize: true,
    centeredSlides: true
  }

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    public customerService: CustomerService,
    private modalCtrl: ModalController,
    public portfolioService: PortfolioService) { }

  ngOnInit() {
    this.portfolioService.clearStore()
  }

  ngAfterViewInit(){
    this.portfolioService.getPortfolios(this.user._id)
  }

  ngOnDestroy() { 
    this.portfolioService.clearStore()
    this.ngUnsubscribe.next(true)
    this.ngUnsubscribe.complete()
  }

  async close(event:boolean = false){
    await this.modalCtrl.dismiss(event);
  }

  async onClickMenu(){
    this.menuCtrl.toggle('profileMenu');
  }

  async logoutButton(){
    this.authService.logOut();
  }
  async editPicture(){
    console.log("Edit Picture");
  }

}