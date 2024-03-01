import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { FeatureComponent } from '../../components/feature/feature.component';


@Component({
  selector: 'app-h`ome',
  imports: [BannerComponent,FeatureComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
