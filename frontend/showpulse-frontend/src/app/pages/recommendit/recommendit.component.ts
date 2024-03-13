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

  constructor(private elementRef:ElementRef, private alertService:AlertService,private router:Router, private showService:ShowService, private renderer:Renderer2, @Inject(PLATFORM_ID) private platformId:Object,private route:ActivatedRoute) {
    this.recommendedShows = [];
    this.loading = false; 
   }

  ngOnInit() {
   this.route.queryParams.subscribe(params =>{
    const showIds:number[] = params['showIds'];
    if(showIds && showIds.length == 3){
      this.showService.getRecommendedShowsFromInput(showIds).subscribe(
        recomendations => {this.recommendedShows = recomendations,this.loading = true}
      )
    }else{
      this.alertService.error('Insufficient shows','Please choose at least 3 shows.')
      this.router.navigate(['/search']);
      
    }
   }) 
   if (isPlatformBrowser(this.platformId)) {
    const bar = this.elementRef.nativeElement.querySelector('.progress-bar');
    const counter = this.elementRef.nativeElement.querySelector('.count');

    let i = 0;
    const throttle = 0.49; // 0-1

    if (!bar || !counter) {
      console.error("Progress bar or the counter could not be found.");
      return;
    }

    const draw = () => {
      if (i <= 100) {
        const r = Math.random();
        requestAnimationFrame(draw);
        this.renderer.setStyle(bar, 'width', i + '%');
        counter.innerHTML = Math.round(i) + '%';

        if (r < throttle) {
          // Simulate d/l speed and uneven bitrate
          i = i + r;
        }
      } else {
        setTimeout(() => {
          this.renderer.addClass(bar, 'done'); // Add the "done" class for fading effect
          this.renderer.setStyle(counter, 'transition', 'opacity 1s'); // Apply transition to counter
          this.renderer.setStyle(bar, 'opacity', '0'); // Fade out the bar
          this.renderer.setStyle(counter, 'opacity', '0'); // Fade out the percentage
        }, 500);
        setTimeout(() => {
          const progressBarContainer = this.elementRef.nativeElement.querySelector('#progress-bar-container');
          const carouselContainer = this.elementRef.nativeElement.querySelector('.carousel-container');
          this.renderer.addClass(progressBarContainer, 'hidden');
          this.renderer.removeClass(carouselContainer, 'hidden');
        }, 500);
      }
    };

    draw();
  }
}
}


