import { Component } from '@angular/core';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {

  constructor(private customerService: CustomerService) {}

  ionViewWillEnter() {
    if(!this.customerService.getCurrentValueCustomer()) {
      this.customerService.getCustomer().subscribe()
    }
  }
}
