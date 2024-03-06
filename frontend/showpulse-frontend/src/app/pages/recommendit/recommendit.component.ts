import { Component, OnInit } from '@angular/core';
import { PricingComponent } from '../../components/pricing/pricing.component';

@Component({
  selector: 'app-recommendit',
  templateUrl: './recommendit.component.html',
  styleUrls: ['./recommendit.component.css'],
  imports:[PricingComponent],
  standalone:true,
})
export class RecommenditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
