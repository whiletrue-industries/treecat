import { Component } from '@angular/core';
import { TooltipComponent } from "../tooltip/tooltip.component";
import { TooltipService } from '../tooltip.service';

@Component({
  selector: 'app-tooltip-container',
  imports: [TooltipComponent],
  templateUrl: './tooltip-container.component.html',
  styleUrl: './tooltip-container.component.less'
})
export class TooltipContainerComponent {

  constructor(public tooltip: TooltipService) {}
}
