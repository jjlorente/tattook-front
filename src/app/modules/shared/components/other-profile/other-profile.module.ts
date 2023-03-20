import { NgModule } from '@angular/core';

import { OtherProfileComponent } from './other-profile.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardModule } from '../board/board.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BoardModule
  ],
  exports: [OtherProfileComponent],
  declarations: [OtherProfileComponent],
  providers: [],
  entryComponents: [OtherProfileComponent]
})
export class OtherProfileModule { }
