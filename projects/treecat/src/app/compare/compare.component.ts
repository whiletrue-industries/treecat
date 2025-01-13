import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartIconComponent } from '../cart-icon/cart-icon.component';
import { ClickOnReturnDirective } from '../click-on-return.directive';
import { HeaderComponent } from '../header/header.component';
import { StateService } from '../state.service';

import domtoimage from 'dom-to-image';
import { jsPDF } from 'jspdf';
import { DataService, Tree } from '../data.service';
import { ModalComponent } from "../modal/modal.component";
import { TooltipIconBrittlenessComponent } from "../tooltip-icon-brittleness/tooltip-icon-brittleness.component";
import { TooltipIconDeciduousComponent } from "../tooltip-icon-deciduous/tooltip-icon-deciduous.component";
import { TooltipIconNativeComponent } from "../tooltip-icon-native/tooltip-icon-native.component";
import { TooltipIconNectarComponent } from "../tooltip-icon-nectar/tooltip-icon-nectar.component";
import { TooltipIconSoilTypeComponent } from "../tooltip-icon-soil-type/tooltip-icon-soil-type.component";
import { TooltipIconSpeciesValueComponent } from "../tooltip-icon-species-value/tooltip-icon-species-value.component";
import { TooltipWrapperComponent } from '../tooltip-wrapper/tooltip-wrapper.component';
import { bloomColorImg, canopyShapeImg, wateringScaleImg } from '../tree-info/tree-info.component';
import { TooltipIconWateringScaleComponent } from "../tooltip-icon-watering-scale/tooltip-icon-watering-scale.component";

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
    TooltipIconNativeComponent,
    TooltipWrapperComponent,
    TooltipIconWateringScaleComponent
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
  deleteCandidate: Tree | null = null;
  showTips = false;

  ngOnInit() {
    this.data.fetchTrees();
    this.state.setPageTitle('מריצת העצים שלי');
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
        let pdf = new jsPDF('l', 'px', [100, 100]);
        const headerUrl = '/img/pdf-header.png';
        const header = pdf.getImageProperties(headerUrl);
        const headerWidth = header.width;
        const headerHeight = header.height;
        
        const pageWidth = Math.max(headerWidth, width) + 2*padding;
        const pageHeight = height + headerHeight + 2*padding;
        
        const headerX = pageWidth - headerWidth - padding;
        const headerY = 0;
        const contentX = pageWidth - width - padding;
        const contentY = padding + headerHeight;

        pdf = new jsPDF(pageHeight > pageWidth ? 'p' : 'l', 'px', [pageWidth, pageHeight], true);
        pdf.addImage(headerUrl, 'PNG', headerX, headerY, headerWidth, headerHeight);
        pdf.link(headerX, headerY, headerWidth, headerHeight, {url: window.location.href});
        pdf.addImage(dataUrl, 'PNG', contentX, contentY, width, height);
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
