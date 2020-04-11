import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login.component';
import { AddressFormComponent } from "./pages/address-form/address-form.component";

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'address-form',
        component: AddressFormComponent
      }
    ])
  ],
  declarations: [
    LoginComponent,
    AddressFormComponent
  ],
  providers: [],
})
export class LoginModule { }
