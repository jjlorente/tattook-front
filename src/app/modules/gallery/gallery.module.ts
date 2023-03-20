import { NgModule } from '@angular/core';

import { GalleryComponent } from './gallery.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BoardModule } from '../shared/components/board/board.module';
import { WorkModalModule } from '../shared/components/work-modal/work-modal.module';

@NgModule({
    imports: [
      WorkModalModule,
      BoardModule,
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
      GalleryComponent
    ],
    entryComponents: [],
    providers: [],
})
export class GalleryModule { }
