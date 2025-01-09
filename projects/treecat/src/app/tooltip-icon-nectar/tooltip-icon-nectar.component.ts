import { Component, Input } from '@angular/core';
import { TooltipIconComponent } from "../tooltip-icon/tooltip-icon.component";
import { TooltipAlignments } from '../tooltip.service';

@Component({
  selector: 'app-tooltip-icon-nectar',
  imports: [TooltipIconComponent],
  templateUrl: './tooltip-icon-nectar.component.html',
  styleUrl: './tooltip-icon-nectar.component.less'
})
export class TooltipIconNectarComponent {
  @Input() align: TooltipAlignments = 'bottom-left';
}
