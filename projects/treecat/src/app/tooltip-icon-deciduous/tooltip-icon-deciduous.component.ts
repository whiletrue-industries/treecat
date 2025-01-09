import { Component, Input } from '@angular/core';
import { TooltipComponent } from "../tooltip/tooltip.component";
import { TooltipIconComponent } from '../tooltip-icon/tooltip-icon.component';
import { TooltipAlignments } from '../tooltip.service';

@Component({
  selector: 'app-tooltip-icon-deciduous',
  imports: [TooltipIconComponent],
  templateUrl: './tooltip-icon-deciduous.component.html',
  styleUrl: './tooltip-icon-deciduous.component.less'
})
export class TooltipIconDeciduousComponent {
  @Input() align: TooltipAlignments = 'bottom-left';
}
