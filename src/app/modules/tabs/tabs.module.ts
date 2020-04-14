import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TabsPage,
        children: [
          {
            path: 'profile',
            loadChildren: () => import('../profile/profile.module').then( m => m.ProfileModule)
          },
          {
            path: '',
            redirectTo: '/tabs/profile',
            pathMatch: 'full'
          }
        ]
      }
    ])
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
