/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/space-before-blocks */
/* eslint-disable @typescript-eslint/comma-spacing */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/prefer-readonly */
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  // eslint-disable-next-line padded-blocks
  constructor (private elementRef: ElementRef,private renderer: Renderer2){}

  scrollToSection(sectionId: string) {
    const section = this.elementRef.nativeElement.querySelector('#' + sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
