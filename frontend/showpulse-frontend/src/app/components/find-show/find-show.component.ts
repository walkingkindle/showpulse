import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show/show.service';
import { Show } from '../../Models/Show';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
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
  showForm!: FormGroup;

  constructor(private showService:ShowService, private loadingBarComponent:LoadingBarComponent, private formBuilder:FormBuilder) {
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
      this.loading = false;
    });
    
  }

  selectShow(show:Show){
    const showName = show.name;
    const isDuplicate = this.selectedShows.some(item => item.name == showName);
    if (!isDuplicate){
      const selectedShowsControl = this.showForm.get('selectedShows');
      selectedShowsControl?.setValue([... selectedShowsControl.value,show])
    }else{
      console.log(`Show ${showName} is already selected.`)
    }
  }
  handleSubmit():void{
    if(this.showForm.valid){
      console.log(this.showForm.value.selectedShows)
    }else{
      alert("Please select at least 3 shows.")
    } 

  }

  ngOnInit() {
    this.showForm = this.formBuilder.group({
      showSearch:[''],
      selectedShows:[[], Validators.minLength(3)]
    })
  }

}
