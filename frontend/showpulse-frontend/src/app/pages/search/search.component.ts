import { Component, OnInit } from '@angular/core';
import { FindShowComponent } from '../../components/find-show/find-show.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  imports:[FindShowComponent],
  styleUrls: ['./search.component.css'],
  standalone:true
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
