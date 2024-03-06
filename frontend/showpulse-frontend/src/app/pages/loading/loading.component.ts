import { Component, OnInit } from '@angular/core';
import { GameComponent } from '../../components/game/game.component';
import { LoadingBarComponent } from '../../components/loading-bar/loading-bar.component';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  imports:[GameComponent,LoadingBarComponent],
  standalone:true,
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
