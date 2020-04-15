import { NgModule } from '@angular/core';

import { GalleryComponent } from './gallery.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
              path: '',
              component: GalleryComponent
            }
        ])
    ],
    exports: [],
    declarations: [GalleryComponent],
    providers: [],
})
export class GalleryModule { }
