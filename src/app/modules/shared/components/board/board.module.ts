import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BoardModalComponent } from './board-modal/board-modal.component';
import { PortfolioOverviewComponent } from './portfolio-overview/portfolio-overview.component';
import { PopoverCrudComponent } from '../popover-crud/popover-crud.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [PortfolioOverviewComponent, BoardModalComponent, PopoverCrudComponent],
  declarations: [PortfolioOverviewComponent, BoardModalComponent, PopoverCrudComponent],
  providers: [],
  entryComponents: [PortfolioOverviewComponent, BoardModalComponent, PopoverCrudComponent]
})
export class BoardModule { }
