import { Component, Input, OnInit } from '@angular/core';
import { ShowService } from '../../services/show/show.service';
import { Show } from '../../Models/Show';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../services/show/alert.service';
import { Recommendations } from '../recommendations/recommendations.component';

@Component({
  selector: 'app-find-show',
  templateUrl: './find-show.component.html',
  imports:[FormsModule,CommonModule,RouterLink,ReactiveFormsModule],
  standalone:true
})
export class FindShowComponent implements OnInit {
  input: string;
  shows!: Show[];
  loading!:boolean;
  selectedShows:Show[]
  showForm!: FormGroup;
  showIds:number[];
  formComplete:boolean;

  constructor(private showService:ShowService, private alertService:AlertService, private recommendationsComponent:Recommendations, private formBuilder:FormBuilder,private router:Router) {
    this.input = "";
    this.shows;
    this.loading;
    this.selectedShows = [];
    this.showIds = [];
    this.formComplete = true;

    
    
  }

  //method that retrieves records based on input
  search(): void {
    this.input = this.showForm.get('showSearch')?.value;
    this.loading = true;
    this.showService.getRecordsByInput(this.input)
      .subscribe(shows => {this.shows = shows
      this.loading = false;
    });
    
  }

  //appends to an array that later gets verified
  selectShow(show:Show){
    const showId = show.id;
    const selectedShowsControl = this.showForm.get('selectedShows');
    let isDuplicate = false;
    for(let i = 0; i < selectedShowsControl?.value.length; i++){
      if(selectedShowsControl?.value[i].id === showId){
        isDuplicate = true;
      }
    }
    if (!isDuplicate){
        selectedShowsControl?.setValue([... selectedShowsControl.value,show])
      }
    else{
      this.alertService.error('Already selected','You have already selected this show.')
    }
      this.input = ''
    }
   
    //verifies that selectedShows has exactly 3 showIds
    isFormValid():boolean{
      return this.showForm.get('selectedShows')?.value.length === 3;
    }
  
    //handle submit and throw alertyfy
  handleSubmit(): void {
    if (this.showForm.valid && this.isFormValid()) {
      this.showIds = this.showForm.get('selectedShows')?.value.map((show: any) => show.id);
        this.router.navigate(["/recommendit"], { queryParams: { showIds: this.showIds } })
      }
     else {
      if (this.showForm.get('selectedShows')!.value.length < 3){
        this.alertService.error('Not enough shows','Please enter three shows')
      }
    }
  }

  //form builder
  ngOnInit() {
    this.showForm = this.formBuilder.group({
      showSearch:[''],
      selectedShows:[[], Validators.minLength(3),Validators.maxLength(3)]
    })
  }


}
