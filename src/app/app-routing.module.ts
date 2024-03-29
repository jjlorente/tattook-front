import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'tabs',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'chats',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/chat/chat.module').then( m => m.ChatModule)
  },
  {
    path: 'map',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/map/map.module').then( m => m.MapModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
