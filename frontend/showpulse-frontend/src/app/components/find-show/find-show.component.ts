import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show/show.service';
import { Show } from '../../Models/Show';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-find-show',
  templateUrl: './find-show.component.html',
  styleUrls: ['./find-show.component.css'],
  imports:[FormsModule,CommonModule],
  standalone:true
})
export class FindShowComponent implements OnInit {
  input: string;
  shows!: Show[];
  imageUrlwebsite!:string;

  constructor(private showService:ShowService) {
    this.input = "";
    this.shows;
    this.imageUrlwebsite = "www.thetvdb.com/"
  }

  search(): void {
    this.showService.getRecordsByInput(this.input)
      .subscribe(shows => {this.shows = shows
      console.log(this.shows)
      console.log(typeof(shows))
    });
  }


  ngOnInit() {
  }

}
