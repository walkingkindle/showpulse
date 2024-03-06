import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show/show.service';
import { Show } from '../../Models/Show';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-find-show',
  templateUrl: './find-show.component.html',
  styleUrls: ['./find-show.component.css'],
  imports:[FormsModule,CommonModule,RouterLink],
  standalone:true
})
export class FindShowComponent implements OnInit {
  input: string;
  shows!: Show[];
  imageUrlwebsite!:string;
  loading!:boolean;
  selectedShows:Show[]

  constructor(private showService:ShowService) {
    this.input = "";
    this.shows;
    this.imageUrlwebsite = "www.thetvdb.com/"
    this.loading;
    this.selectedShows = [];
  }

  search(): void {
    this.loading = true;
    this.showService.getRecordsByInput(this.input)
      .subscribe(shows => {this.shows = shows
    });
    this.loading = false;
  }

  selectShow(show:Show){
    console.log(this.selectedShows);
    this.selectedShows.push(show)
  }

  ngOnInit() {
  }

}
