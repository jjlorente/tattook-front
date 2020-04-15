import { NgModule } from '@angular/core';
import { WallComponent } from './wall.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
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