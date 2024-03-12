import { Component, Input, OnInit } from '@angular/core';
import { ShowService } from '../../services/show/show.service';
import { Show} from '../../Models/Show';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css'],
  imports:[CommonModule],
  standalone:true,
})
export class LoadingBarComponent implements OnInit {
@Input() recommendedShows!: Show[];

  constructor(private showService:ShowService) {

   }

  ngOnInit() {
    console.log(this.recommendedShows)
  }
  

}
