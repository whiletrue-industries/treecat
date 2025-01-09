import { Component, Input } from '@angular/core';
import { TooltipIconComponent } from "../tooltip-icon/tooltip-icon.component";
import { TooltipAlignments } from '../tooltip.service';

@Component({
  selector: 'app-tooltip-icon-brittleness',
  imports: [TooltipIconComponent],
  templateUrl: './tooltip-icon-brittleness.component.html',
  styleUrl: './tooltip-icon-brittleness.component.less'
})
export class TooltipIconBrittlenessComponent {
  @Input() align: TooltipAlignments = 'bottom-left';
}
