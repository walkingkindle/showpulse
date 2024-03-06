import { Component, OnInit } from '@angular/core';
import { PricingComponent } from '../../components/pricing/pricing.component';
import { RecommendationsComponent } from '../../components/recommendations/recommendations.component';

@Component({
  selector: 'app-recommendit',
  templateUrl: './recommendit.component.html',
  styleUrls: ['./recommendit.component.css'],
  imports:[PricingComponent,RecommendationsComponent],
  standalone:true,
})
export class RecommenditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
