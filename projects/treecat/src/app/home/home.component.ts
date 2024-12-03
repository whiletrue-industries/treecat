import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { StateService } from '../state.service';
import { SidewalkWidth } from '../data.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

  SidewalkWidth = SidewalkWidth;

  constructor(public state: StateService) {

  }
}
