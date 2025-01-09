import { Component, Input } from '@angular/core';
import { TooltipIconComponent } from "../tooltip-icon/tooltip-icon.component";
import { TooltipAlignments } from '../tooltip.service';

@Component({
  selector: 'app-tooltip-icon-species-value',
  imports: [TooltipIconComponent],
  templateUrl: './tooltip-icon-species-value.component.html',
  styleUrl: './tooltip-icon-species-value.component.less'
})
export class TooltipIconSpeciesValueComponent {
    @Input() align: TooltipAlignments = 'bottom-left';
}
