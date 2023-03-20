import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditProfileModalComponent } from './components/edit-profile-modal/edit-profile-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardModule } from '../shared/components/board/board.module';
import { SearchAddressInputModule } from '../shared/components/search-address/search-address-input.module';
import { WorkModalModule } from '../shared/components/work-modal/work-modal.module';

@NgModule({
  imports: [
    WorkModalModule,
    SearchAddressInputModule,
    BoardModule,
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent
      }
    ])
  ],
  exports: [],
  declarations: [ProfileComponent, EditProfileModalComponent],
  providers: [],
  entryComponents: [EditProfileModalComponent]
})
export class ProfileModule { }
