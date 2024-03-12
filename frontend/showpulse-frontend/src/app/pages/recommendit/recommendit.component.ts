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

  constructor(private elementRef:ElementRef, private showService:ShowService, private renderer:Renderer2, @Inject(PLATFORM_ID) private platformId:Object,private route:ActivatedRoute) {
    this.recommendedShows = [];
   }

  ngOnInit() {
   this.route.queryParams.subscribe(params =>{
    const showIds:number[] = params['showIds'];
    if(showIds && showIds.length == 3){
      this.showService.getRecommendedShowsFromInput(showIds).subscribe(
        recomendations => {this.recommendedShows = recomendations}
      )
    }else{
      console.log("Invalid route") //exception here
    }
   }) 
    if(isPlatformBrowser(this.platformId)){
    const bar = this.elementRef.nativeElement.querySelector('.progress-bar');
    const counter = this.elementRef.nativeElement.querySelector('.count');

    let i = 0;
    const throttle = 0.5; // 0-1

    if(!bar || !counter){
      console.error("Progress bar or the counter could not be found.")
      return;
    }
  

    (function draw() {
    if(i <= 100) {
      var r = Math.random();
      requestAnimationFrame(draw);  
      bar.style.width = i + '%';
      counter.innerHTML = Math.round(i) + '%';
      
      if(r < throttle) { // Simulate d/l speed and uneven bitrate
        i = i + r;
      }
    } else {
      setTimeout(function() {
          bar.className += ' done'; // Add the "done" class for fading effect
          counter.style.transition = 'opacity 1s'; // Apply transition to counter
          bar.style.opacity = '0'; // Fade out the bar
          counter.style.opacity = '0'; // Fade out the percentage
        }, 1500); 
      setTimeout(function() {
          $('#progress-bar-container').addClass('hidden') 
          $('.carousel-container').removeClass('hidden')
          
      },1500)
    }
  })();
    }

  }


}
