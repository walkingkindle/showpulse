import { Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, Renderer2, inject } from '@angular/core';
import { Recommendations } from '../../components/recommendations/recommendations.component';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowService } from '../../services/show/show.service';
import { Show } from '../../Models/Show';
import { AlertService } from '../../services/show/alert.service';

@Component({
  selector: 'app-recommendit',
  templateUrl: './recommendit.component.html',
  styleUrls: ['./recommendit.component.css'],
  imports:[Recommendations],
  standalone:true,
})
export class RecommenditComponent implements OnInit {
  recommendedShows:Show[];
  loading:boolean;
  recommendedShowIds:number[];
  recommendedShow!: Show;

  constructor(private elementRef:ElementRef, private alertService:AlertService,private router:Router, private showService:ShowService, private renderer:Renderer2, @Inject(PLATFORM_ID) private platformId:Object,private route:ActivatedRoute) {
    this.recommendedShows = [];
    this.loading = false; 
    this.recommendedShowIds = [];
    this.recommendedShow;
   }
  ngOnInit() {
  }

 
}


