import { Component, OnInit } from '@angular/core';
import { FindShowComponent } from '../../components/find-show/find-show.component';
import { HttpClient,HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  imports:[FindShowComponent,HttpClientModule],
  styleUrls: ['./search.component.css'],
  standalone:true
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
