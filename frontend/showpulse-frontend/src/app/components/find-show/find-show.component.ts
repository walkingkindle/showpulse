import { Component, Input, OnInit } from '@angular/core';
import { ShowService } from '../../services/show/show.service';
import { Show } from '../../Models/Show';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoadingBarComponent } from '../loading-bar/loading-bar.component';
import { AlertService } from '../../services/show/alert.service';

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
  loading!:boolean;
  selectedShows:Show[]
  showForm!: FormGroup;
  showIds:number[];
  formComplete:boolean;

  constructor(private showService:ShowService, private alertService:AlertService, private loadingBarComponent:LoadingBarComponent, private formBuilder:FormBuilder,private router:Router) {
    this.input = "";
    this.shows;
    this.loading;
    this.selectedShows = [];
    this.showIds = [];
    this.formComplete = true;

    
    
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
  handleSubmit(): void {
    if (this.showForm.valid) {
      this.showIds = this.showForm.get('selectedShows')?.value.map((show: any) => show.id);
        this.router.navigate(["/recommendit"], { queryParams: { showIds: this.showIds } })
      }
     else {
      if (this.showForm.get('selectedShows')?.value.length < 3){
        console.log('alert')
        this.alertService.error('Not enough shows','Please enter three shows')
      }
    }
  }

  ngOnInit() {
    this.showForm = this.formBuilder.group({
      showSearch:[''],
      selectedShows:[[], Validators.minLength(3)]
    })
  }


}
