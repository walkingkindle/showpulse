import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show/show.service';
import { Show } from '../../Models/Show';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingBarComponent } from '../loading-bar/loading-bar.component';

@Component({
  selector: 'app-find-show',
  templateUrl: './find-show.component.html',
  styleUrls: ['./find-show.component.css'],
  imports:[FormsModule,CommonModule,RouterLink,ReactiveFormsModule],
  standalone:true
})
export class FindShowComponent implements OnInit {
  input: string;
  shows!: Show[];
  imageUrlwebsite!:string;
  loading!:boolean;
  selectedShows:Show[]
  showIds:number[]

  constructor(private showService:ShowService, private loadingBarComponent:LoadingBarComponent) {
    this.input = "";
    this.shows;
    this.imageUrlwebsite = "www.thetvdb.com/"
    this.loading;
    this.selectedShows = [];
    this.showIds = [];
    
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
  handleSubmit():void{
    console.log(this.selectedShows);
    this.selectedShows.forEach(show => {
      this.showIds.push(show.id)
    });
    this.loadingBarComponent.showIds = this.showIds;
  }

  ngOnInit() {
  }

}
