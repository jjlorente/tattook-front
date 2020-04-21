import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService) { }

  ngOnInit() {
  }

  async onClickMenu(){
    this.menuCtrl.toggle('profileMenu');
  }

  async logoutButton(){
    this.authService.logOut();
  }
}