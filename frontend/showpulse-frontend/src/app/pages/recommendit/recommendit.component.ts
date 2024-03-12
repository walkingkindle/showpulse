import { Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, Renderer2, inject } from '@angular/core';
import { PricingComponent } from '../../components/pricing/pricing.component';
import { LoadingBarComponent } from '../../components/loading-bar/loading-bar.component';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ShowService } from '../../services/show/show.service';
import { Show } from '../../Models/Show';

@Component({
  selector: 'app-recommendit',
  templateUrl: './recommendit.component.html',
  styleUrls: ['./recommendit.component.css'],
  imports:[LoadingBarComponent],
  standalone:true,
})
export class RecommenditComponent implements OnInit {
  recommendedShows:Show[];
  loading:boolean;

  constructor(private elementRef:ElementRef, private showService:ShowService, private renderer:Renderer2, @Inject(PLATFORM_ID) private platformId:Object,private route:ActivatedRoute) {
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
      console.log("Invalid route") //exception here
    }
   }) 
   if (isPlatformBrowser(this.platformId)) {
    const bar = this.elementRef.nativeElement.querySelector('.progress-bar');
    const counter = this.elementRef.nativeElement.querySelector('.count');

    let i = 0;
    const throttle = 0.32; // 0-1

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
        }, 1500);
        setTimeout(() => {
          const progressBarContainer = this.elementRef.nativeElement.querySelector('#progress-bar-container');
          const carouselContainer = this.elementRef.nativeElement.querySelector('.carousel-container');
          this.renderer.addClass(progressBarContainer, 'hidden');
          this.renderer.removeClass(carouselContainer, 'hidden');
        }, 1500);
      }
    };

    draw();
  }
}
}


