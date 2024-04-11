import { Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ShowService } from '../../services/show/show.service';
import { Show} from '../../Models/Show';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AlertService } from '../../services/show/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from, mergeMap } from 'rxjs';
@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  imports:[CommonModule],
  standalone:true,
})
export class Recommendations implements OnInit {
  recommendedShows:Show[];
  loading:boolean;
  recommendedShowIds:number[];
  recommendedShow!: Show;
  showIdsParams:number[];
  loadingCompleteButStillWaiting: boolean = false

  constructor(private elementRef:ElementRef, private alertService:AlertService,private router:Router, private showService:ShowService, private renderer:Renderer2, @Inject(PLATFORM_ID) private platformId:Object,private route:ActivatedRoute) {
    this.recommendedShows = [];
    this.loading = true;
    this.recommendedShowIds = [];
    this.recommendedShow;
    this.showIdsParams = [];
   }

//start loading animation, subscribe to API and stop loading when finalized
ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    this.startLoadingAnimation();
  }

  this.route.queryParams.subscribe(params => {
    this.showIdsParams = params['showIds'];
    if (this.showIdsParams && this.showIdsParams.length === 3) {
      // Convert string values to numbers
      const showIdsParamsNumeric = this.showIdsParams.map(id => +id);
      this.showService.getRecommendedShowsFromInput(this.showIdsParams).subscribe(response => {
        this.recommendedShows = response;
        }, error => {
        console.error('Error fetching recommended shows:', error);
      }, () => {
        // Finalize animation and set loading to false when all calls are completed
        this.loading = false;
        this.finalizeAnimation();
      });
    }
  });
}

private startLoadingAnimation() {
  const bar = this.elementRef.nativeElement.querySelector('.progress-bar');
  const counter = this.elementRef.nativeElement.querySelector('.count');

  let i = 0;
  const throttle = 0.3; // 0-1

  if (!bar || !counter) {
      console.error("Progress bar or the counter could not be found.");
      return;
  }

  const draw = () => {
      const pleaseWaitMessage = this.elementRef.nativeElement.querySelector('#please-wait-message')
      // Continue drawing until loading is false
      if (this.loading && i <= 100) {
          const r = Math.random();
          requestAnimationFrame(draw);
          this.renderer.setStyle(bar, 'width', i + '%');
          counter.innerHTML = Math.round(i) + '%';

          if (r < throttle) {
              // Simulate d/l speed and uneven bitrate
              i = i + r;
          }
      } else if (i == 100 && this.loading) {
          this.loadingCompleteButStillWaiting = true;
          this.renderer.removeClass(pleaseWaitMessage,'hidden')
      } else {
          // Call finalizeAnimation function when loading is complete
          if (!this.loading) {
              this.finalizeAnimation();
          }
      }
  };

  draw();
}

private finalizeAnimation() {
    const bar = this.elementRef.nativeElement.querySelector('.progress-bar');
    const counter = this.elementRef.nativeElement.querySelector('.count');

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
}

