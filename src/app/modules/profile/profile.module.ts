import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditProfileModalComponent } from './components/edit-profile-modal/edit-profile-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
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
