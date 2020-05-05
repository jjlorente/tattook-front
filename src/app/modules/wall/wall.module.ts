import { NgModule } from '@angular/core';
import { WallComponent } from './wall.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { BoardModule } from '../shared/components/board/board.module';
import { WorkModalModule } from '../shared/components/work-modal/work-modal.module';

@NgModule({
    imports: [
      IonicModule,
      WorkModalModule,
      BoardModule,
      IonicModule,
      CommonModule,
      RouterModule.forChild([
        {
          path: '',
          component: WallComponent
        }
      ])
    ],
    exports: [],
    declarations: [WallComponent],
    providers: [],
})
export class WallModule { }