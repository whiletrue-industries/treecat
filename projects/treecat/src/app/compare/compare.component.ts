import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ClickOnReturnDirective } from '../click-on-return.directive';
import { HeaderComponent } from '../header/header.component';
import { CartIconComponent } from '../cart-icon/cart-icon.component';
import { StateService } from '../state.service';

import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { DataService, Tree } from '../data.service';
import { canopyShapeImg, bloomColorImg, wateringScaleImg, DROP_ICON } from '../tree-info/tree-info.component';
import { ModalComponent } from "../modal/modal.component";
import { TooltipIconComponent } from '../tooltip-icon/tooltip-icon.component';
import { TooltipIconDeciduousComponent } from "../tooltip-icon-deciduous/tooltip-icon-deciduous.component";
import { TooltipIconBrittlenessComponent } from "../tooltip-icon-brittleness/tooltip-icon-brittleness.component";
import { TooltipIconNectarComponent } from "../tooltip-icon-nectar/tooltip-icon-nectar.component";
import { TooltipIconSpeciesValueComponent } from "../tooltip-icon-species-value/tooltip-icon-species-value.component";
import { TooltipIconSoilTypeComponent } from "../tooltip-icon-soil-type/tooltip-icon-soil-type.component";
import { TooltipIconNativeComponent } from "../tooltip-icon-native/tooltip-icon-native.component";

@Component({
  selector: 'app-compare',
  imports: [
    RouterModule,
    ClickOnReturnDirective,
    HeaderComponent,
    CartIconComponent,
    ModalComponent,
    TooltipIconDeciduousComponent,
    TooltipIconBrittlenessComponent,
    TooltipIconNectarComponent,
    TooltipIconSpeciesValueComponent,
    TooltipIconSoilTypeComponent,
    TooltipIconNativeComponent
],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.less'
})
export class CompareComponent implements OnInit {

  @ViewChild('comparison') comparisonEl: ElementRef;

  constructor(private router: Router, public state: StateService, public data: DataService) {}

  canopyShapeImg = canopyShapeImg;
  bloomColorImg = bloomColorImg;
  wateringScaleImg = wateringScaleImg;
  DROP_ICON = DROP_ICON;
  deleteCandidate: Tree | null = null;
  showTips = false;

  ngOnInit() {
    this.data.fetchTrees();
  }

  close() {
    this.router.navigate(['/catalog'], { queryParamsHandling: 'preserve'});
  }

  saveAsPdf() {
    const el = this.comparisonEl.nativeElement;
    if (!el) {
      return;
    }
    domtoimage.toPng(el)
      .then((dataUrl) => {
        const width = el.offsetWidth;
        const height = el.offsetHeight;
        const padding = 20;
        var pdf = new jsPDF('l', 'pt', [width + 2*padding, height + 2*padding]);
        pdf.addImage(dataUrl, 'PNG', padding, padding, width, height);
        pdf.save('comparison.pdf');
      });
  }

  removeFromCart() {
    if (this.deleteCandidate) {
      this.state.removeFromCart(this.deleteCandidate);
      this.deleteCandidate = null;
    }
  }
}
