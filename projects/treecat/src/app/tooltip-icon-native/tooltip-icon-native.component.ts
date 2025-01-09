import { Component, Input } from '@angular/core';
import { TooltipIconComponent } from "../tooltip-icon/tooltip-icon.component";
import { TooltipAlignments } from '../tooltip.service';

@Component({
  selector: 'app-tooltip-icon-native',
  imports: [TooltipIconComponent],
  templateUrl: './tooltip-icon-native.component.html',
  styleUrl: './tooltip-icon-native.component.less'
})
export class TooltipIconNativeComponent {
  @Input() align: TooltipAlignments = 'bottom-left';
}
