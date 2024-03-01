import { Component, OnInit } from '@angular/core';
import { SearchBannerComponent } from './search-banner/search-banner.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  imports:[SearchBannerComponent],
  styleUrls: ['./search.component.css'],
  standalone:true
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
