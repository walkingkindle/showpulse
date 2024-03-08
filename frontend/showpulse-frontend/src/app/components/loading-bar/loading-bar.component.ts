import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show/show.service';
@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css'],
  standalone:true,
})
export class LoadingBarComponent implements OnInit {
  showIds:number[]; 
  constructor(private showService:ShowService) {
    this.showIds = [];

   }

  ngOnInit() {
  }
  

}
