import { NgModule } from '@angular/core';

import { WorkModalComponent } from './work-modal.component';
import { IonicModule } from '@ionic/angular';
import { ImagePopoverComponent } from '../image-popover/image-popover.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [IonicModule, CommonModule],
  exports: [WorkModalComponent, ImagePopoverComponent],
  declarations: [WorkModalComponent, ImagePopoverComponent],
  providers: [],
  entryComponents: [WorkModalComponent, ImagePopoverComponent]
})
export class WorkModalModule { }
