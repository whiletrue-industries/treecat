import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { StateService } from '../state.service';
import { SidewalkWidth } from '../data.service';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';

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
  environment = environment;
  hovering: SidewalkWidth | null = null;

  constructor(public state: StateService) {

  }

  sidewalkImage(width: SidewalkWidth): string {
    const state = this.state.selectedSidewalkWidth === width ? 'selected' : 
      (this.hovering === width ? 'hover' : 'normal');
    return `${environment.base}img/illus-hp-${width}-${state}.svg`;
  }
}
