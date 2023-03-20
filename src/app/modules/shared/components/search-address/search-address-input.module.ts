import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SearchAddressInputComponent } from './search-address-input.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [SearchAddressInputComponent],
  declarations: [SearchAddressInputComponent],
  providers: [],
})
export class SearchAddressInputModule { }
