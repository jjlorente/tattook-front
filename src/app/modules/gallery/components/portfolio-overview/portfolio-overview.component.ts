import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-portfolio-overview',
  templateUrl: 'portfolio-overview.component.html'
})

export class PortfolioOverviewComponent implements OnInit {
  @Input('portfolio') portfolio:any;

  constructor() { }

  ngOnInit() { }
}