import { Component, Input } from '@angular/core';
import { TooltipAlignments } from '../tooltip.service';

@Component({
  selector: 'app-tooltip',
  imports: [],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.less'
})
export class TooltipComponent {

  @Input() align: TooltipAlignments = 'bottom-left';

}
