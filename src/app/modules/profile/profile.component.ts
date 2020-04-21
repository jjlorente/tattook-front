import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
  }

  async onClickMenu(){
    this.menuCtrl.toggle("profileMenu");
  }
}