import { NgModule } from '@angular/core';

import { MapComponent } from './map.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OtherProfileModule } from '../shared/components/other-profile/other-profile.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MapComponent
      }
    ]),
    OtherProfileModule
  ],
  exports: [],
  declarations: [MapComponent],
  providers: [],
})
export class MapModule { }
