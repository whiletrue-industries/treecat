import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { StateService } from '../state.service';
import { ClimateArea, SidewalkWidth } from '../data.service';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { ModalComponent } from '../modal/modal.component';
import { FC_CLIMATE_AREAS } from '../filters/config';
import { ClickOnReturnDirective } from '../click-on-return.directive';

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    HeaderComponent,
    ModalComponent,
    ClickOnReturnDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

  SidewalkWidth = SidewalkWidth;
  environment = environment;
  hovering: SidewalkWidth | null = null;
  selectingClimateArea = false;

  FC_CLIMATE_AREAS = FC_CLIMATE_AREAS;
  CLIMATE_LABELS: {[key: string]: {top: number, right: number, lineLength: number}} = {
    [ClimateArea.Mountain]: {top: 170, right: 120, lineLength: 78},
    [ClimateArea.Desert]: {top: 300, right: 150, lineLength: 37},
    [ClimateArea.Coastal]: {top: 105, right: 130, lineLength: 28},
    [ClimateArea.Valley]: {top: 235, right: 115, lineLength: 84},
  };

  constructor(public state: StateService, private router: Router) {

  }

  sidewalkImage(width: SidewalkWidth): string {
    const state = this.state.selectedSidewalkWidth === width ? 'selected' : 
      (this.hovering === width ? 'hover' : 'normal');
    return `${environment.base}img/illus-hp-${width}-${state}.svg`;
  }

  selectClimateArea(area: ClimateArea) {
    this.state.selectedClimateArea = area;
    this.selectingClimateArea = false;
    this.router.navigate(['/catalog'], { queryParamsHandling: 'preserve' });
  }

  modalClosed() {
    this.selectingClimateArea = false;
  }
}
