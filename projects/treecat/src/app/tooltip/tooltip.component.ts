import { Component, Input } from '@angular/core';
import { TooltipAlignments } from '../tooltip.service';

@Component({
  selector: 'app-tooltip',
  imports: [],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.less',
  host: {
    '[class.align-bottom-left]': 'align === "bottom-left"',
    '[class.align-bottom-right]': 'align === "bottom-right"',
    '[class.align-top-left]': 'align === "top-left"',
    '[class.align-top-right]': 'align === "top-right"',
  },
})
export class TooltipComponent {

  @Input() align: TooltipAlignments = 'bottom-left';
}
