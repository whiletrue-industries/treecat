import { Component, Input } from '@angular/core';
import { TooltipIconComponent } from "../tooltip-icon/tooltip-icon.component";
import { TooltipAlignments } from '../tooltip.service';

@Component({
  selector: 'app-tooltip-icon-soil-type',
  imports: [TooltipIconComponent],
  templateUrl: './tooltip-icon-soil-type.component.html',
  styleUrl: './tooltip-icon-soil-type.component.less'
})
export class TooltipIconSoilTypeComponent {
  @Input() align: TooltipAlignments = 'bottom-left';
}
