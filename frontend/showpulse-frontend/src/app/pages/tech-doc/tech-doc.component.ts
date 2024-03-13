import { Component, OnInit } from '@angular/core';
import { TechnicalComponent } from '../../components/technical/technical.component';

@Component({
  selector: 'app-tech-doc',
  templateUrl: './tech-doc.component.html',
  styleUrls: ['./tech-doc.component.css'],
  standalone:true,
  imports:[TechnicalComponent]
})
export class TechDocComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
