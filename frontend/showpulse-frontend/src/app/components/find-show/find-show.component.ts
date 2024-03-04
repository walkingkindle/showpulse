import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show/show.service';
import { Show } from '../../Models/Show';

@Component({
  selector: 'app-find-show',
  templateUrl: './find-show.component.html',
  styleUrls: ['./find-show.component.css'],
  standalone:true
})
export class FindShowComponent implements OnInit {



  constructor(private showService:ShowService) {
   }

  ngOnInit() {
  }

}
