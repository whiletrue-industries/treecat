import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { StateService } from '../state.service';
import { ClimateArea, SidewalkWidth } from '../data.service';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { ModalComponent } from '../modal/modal.component';
import { FC_CLIMATE_AREAS, FC_TREE_TYPES } from '../filters/config';
import { ClickOnReturnDirective } from '../click-on-return.directive';
import { PlatformService } from '../platform.service';
import { LayoutService } from '../layout.service';

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
    [ClimateArea.Coastal]: {top: 170, right: 160, lineLength: 38},
    [ClimateArea.Desert]: {top: 300, right: 150, lineLength: 37},
    [ClimateArea.Mountain]: {top: 105, right: 105, lineLength: 53},
    [ClimateArea.Valley]: {top: 235, right: 115, lineLength: 84},
  };

  @ViewChild('mediumSidewalk') mediumSidewalk: ElementRef;

  constructor(public state: StateService, private router: Router, private platform: PlatformService, public layout: LayoutService) {  
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
    const option = FC_TREE_TYPES.options.find(o => o.label.indexOf('רחוב') >= 0);
    if (option) {
      this.state.filters[FC_TREE_TYPES.slug].value.set([option]);
    }
    this.selectingClimateArea = false;
    this.router.navigate(['/catalog'], { queryParamsHandling: 'preserve' });
  }

  modalClosed() {
    this.selectingClimateArea = false;
  }

  get modalOpen() {
    return this.selectingClimateArea || this.showingInitialDialog;
  }
}
