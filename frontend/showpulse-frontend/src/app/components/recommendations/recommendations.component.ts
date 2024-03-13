import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ShowService } from '../../services/show/show.service';
import { Show} from '../../Models/Show';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
  imports:[CommonModule],
  standalone:true,
})
export class Recommendations implements OnInit {
@Input() recommendedShows!: Show[];

  constructor(private showService:ShowService, private elementRef:ElementRef,private renderer:Renderer2) {

   }

  ngOnInit() {
  }
  ngAfterViewInit() {
    const carouselElement = this.elementRef.nativeElement.querySelector("#myCarousel")
    if(carouselElement){
      this.renderer.addClass(carouselElement,'carousel')
    }else{
      console.error("Carousel element not found")
    }

  }
  

}
