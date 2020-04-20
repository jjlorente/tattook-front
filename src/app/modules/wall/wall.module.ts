import { NgModule } from '@angular/core';
import { WallComponent } from './wall.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
      IonicModule,
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