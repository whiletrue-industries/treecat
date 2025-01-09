import { Component, Input } from '@angular/core';
import { TooltipAlignments } from '../tooltip.service';
import { TooltipIconComponent } from '../tooltip-icon/tooltip-icon.component';

@Component({
  selector: 'app-tooltip-icon-watering-scale',
  imports: [
    TooltipIconComponent
  ],
  templateUrl: './tooltip-icon-watering-scale.component.html',
  styleUrl: './tooltip-icon-watering-scale.component.less'
})
export class TooltipIconWateringScaleComponent {
    @Input() align: TooltipAlignments = 'bottom-left';
}
