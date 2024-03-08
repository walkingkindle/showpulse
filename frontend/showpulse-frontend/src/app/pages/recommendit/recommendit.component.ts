import { Component, OnInit } from '@angular/core';
import { PricingComponent } from '../../components/pricing/pricing.component';
import { LoadingBarComponent } from '../../components/loading-bar/loading-bar.component';

@Component({
  selector: 'app-recommendit',
  templateUrl: './recommendit.component.html',
  styleUrls: ['./recommendit.component.css'],
  imports:[LoadingBarComponent],
  standalone:true,
})
export class RecommenditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
