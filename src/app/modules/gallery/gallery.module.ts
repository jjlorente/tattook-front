import { NgModule } from '@angular/core';

import { GalleryComponent } from './gallery.component';
import { RouterModule } from '@angular/router';
import { IonicModule, PopoverController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BoardModule } from '../shared/components/board/board.module';

@NgModule({
    imports: [
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
