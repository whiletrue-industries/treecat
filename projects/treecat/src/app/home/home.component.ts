import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { StateService } from '../state.service';
import { ClimateArea, SidewalkWidth } from '../data.service';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { ModalComponent } from '../modal/modal.component';
import { FC_CLIMATE_AREAS } from '../filters/config';
import { ClickOnReturnDirective } from '../click-on-return.directive';
import { PlatformService } from '../platform.service';

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
export class HomeComponent implements OnInit, AfterViewInit {

  SidewalkWidth = SidewalkWidth;
  environment = environment;
  hovering: SidewalkWidth | null = null;
  selectingClimateArea = false;
  showingInitialDialog = false;

  FC_CLIMATE_AREAS = FC_CLIMATE_AREAS;
  CLIMATE_LABELS: {[key: string]: {top: number, right: number, lineLength: number}} = {
    [ClimateArea.Mountain]: {top: 170, right: 120, lineLength: 78},
    [ClimateArea.Desert]: {top: 300, right: 150, lineLength: 37},
    [ClimateArea.Coastal]: {top: 105, right: 130, lineLength: 28},
    [ClimateArea.Valley]: {top: 235, right: 115, lineLength: 84},
  };

  @ViewChild('mediumSidewalk') mediumSidewalk: ElementRef;

  constructor(public state: StateService, private router: Router, private platform: PlatformService) {  
  }

  ngOnInit(): void {
    this.showingInitialDialog = !this.state.firstDialogShown;
    this.state.firstDialogShown = true;
    this.state.setPageTitle(null);
  }

  ngAfterViewInit(): void {
    this.platform.browser(() => {
      (this.mediumSidewalk?.nativeElement as HTMLElement)?.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'end'});
    });
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
