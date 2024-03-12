import { Component, Input, OnInit } from '@angular/core';
import { ShowService } from '../../services/show/show.service';
import { Show } from '../../Models/Show';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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
  showForm!: FormGroup;
  showIds:number[];

  constructor(private showService:ShowService, private loadingBarComponent:LoadingBarComponent, private formBuilder:FormBuilder,private router:Router) {
    this.input = "";
    this.shows;
    this.imageUrlwebsite = "www.thetvdb.com/"
    this.loading;
    this.selectedShows = [];
    this.showIds = [];
    
    
  }

  search(): void {
    this.input = this.showForm.get('showSearch')?.value;
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
      this.showIds = this.showForm.get('selectedShows')?.value.map((show: any) => show.id);
      console.log(this.showIds);
      this.router.navigate(["/recommendit"],{queryParams:{showIds:this.showIds}})
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
