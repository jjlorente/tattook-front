import { NgModule } from '@angular/core';

import { GalleryComponent } from './gallery.component';
import { RouterModule } from '@angular/router';
import { IonicModule, PopoverController } from '@ionic/angular';
import { PortfolioOverviewComponent } from './components/portfolio-overview/portfolio-overview.component';
import { CommonModule } from '@angular/common';
import { BoardModalComponent } from './components/board-modal/board-modal.component';
import { PopoverCrudComponent } from '../shared/components/popover-crud/popover-crud.component';

@NgModule({
    imports: [
      IonicModule,
      CommonModule,
      RouterModule.forChild([
        {
          path: '',
          component: GalleryComponent
        }
      ])
    ],
    exports: [],
    declarations: [
      GalleryComponent,
      PortfolioOverviewComponent,
      BoardModalComponent,
      PopoverCrudComponent
    ],
    entryComponents: [
      PortfolioOverviewComponent,
      BoardModalComponent,
      PopoverCrudComponent
    ],
    providers: [],
})
export class GalleryModule { }
