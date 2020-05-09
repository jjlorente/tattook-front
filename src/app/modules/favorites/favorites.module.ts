import { NgModule } from '@angular/core';

import { FavoritesComponent } from './favorites.component';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BoardModule } from '../shared/components/board/board.module';
import { WorkModalModule } from '../shared/components/work-modal/work-modal.module';
import { OtherProfileModule } from '../shared/components/other-profile/other-profile.module';

@NgModule({
    imports: [
        OtherProfileModule,
        WorkModalModule,
        BoardModule,
        IonicModule,
        CommonModule,
        RouterModule.forChild([
            {
              path: '',
              component: FavoritesComponent
            }
        ])
    ],
    exports: [],
    declarations: [FavoritesComponent],
    providers: [],
})
export class FavoritesModule { }
