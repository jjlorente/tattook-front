import { WorkService } from './../shared/components/work-modal/work.service';
import { PortfolioService } from 'src/app/modules/gallery/services/portfolio.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
})
export class WallComponent implements OnInit {
  work:any;
  constructor(
    public workService: WorkService
  ) {}

  ngOnInit() {}

  ionViewWillEnter(){
    this.workService.getAllWorks();
  }
}
