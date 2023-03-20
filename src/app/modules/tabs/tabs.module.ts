import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
import { NewImageModalComponent } from '../gallery/components/new-image-modal/new-image-modal.component';

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
            path: 'wall',
            loadChildren: () => import('../wall/wall.module').then( m => m.WallModule)
          },
          {
            path: 'gallery',
            loadChildren: () => import('../gallery/gallery.module').then( m => m.GalleryModule)
          },
          {
            path: 'favorites',
            loadChildren: () => import('../favorites/favorites.module').then( m => m.FavoritesModule)
          },
          {
            path: '',
            redirectTo: '/tabs/wall',
            pathMatch: 'full'
          }
        ]
      }
    ])
  ],
  declarations: [TabsPage, NewImageModalComponent],
  entryComponents: [NewImageModalComponent]
})
export class TabsPageModule {}
