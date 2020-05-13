import { NgModule } from '@angular/core';

import { ChatComponent } from './private/chat.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'private/:userId',
        component: ChatComponent
      },
      {
        path: 'list',
        component: ListComponent
      }
    ])
  ],
  exports: [],
  declarations: [ChatComponent, ListComponent],
  providers: [],
})
export class ChatModule { }
