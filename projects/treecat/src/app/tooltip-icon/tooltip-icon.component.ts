import { Component, Input } from '@angular/core';
import { TooltipWrapperComponent } from '../tooltip-wrapper/tooltip-wrapper.component';
import { TooltipAlignments } from '../tooltip.service';

@Component({
  selector: 'app-tooltip-icon',
  imports: [
    TooltipWrapperComponent
  ],
  templateUrl: './tooltip-icon.component.html',
  styleUrl: './tooltip-icon.component.less'
})
export class TooltipIconComponent {

  @Input() align: TooltipAlignments = 'bottom-left';
}
