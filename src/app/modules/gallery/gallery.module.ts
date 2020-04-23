import { NgModule } from '@angular/core';

import { GalleryComponent } from './gallery.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PortfolioOverviewComponent } from './components/portfolio-overview/portfolio-overview.component';
import { CommonModule } from '@angular/common';

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
      PortfolioOverviewComponent
    ],
    entryComponents: [PortfolioOverviewComponent],
    providers: [],
})
export class GalleryModule { }
