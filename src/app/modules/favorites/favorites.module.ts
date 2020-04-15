import { NgModule } from '@angular/core';

import { FavoritesComponent } from './favorites.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
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
