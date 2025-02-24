import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TooltipAlignments, TooltipService } from '../tooltip.service';

@Component({
  selector: 'app-tooltip-wrapper',
  imports: [],
  templateUrl: './tooltip-wrapper.component.html',
  styleUrl: './tooltip-wrapper.component.less'
})
export class TooltipWrapperComponent {
  @Input() align: TooltipAlignments = 'bottom-left';
  @Input() inert = false;

  content = '';
  @ViewChild('anchor') anchorEl: ElementRef;
  @ViewChild('content') contentEl: ElementRef;

  constructor(private tooltip: TooltipService) {}

  ngAfterViewInit() {
    this.content = this.contentEl.nativeElement.innerHTML;
  }

  show(event: MouseEvent) {
    // console.log('showing tooltip', event, this.anchorEl.nativeElement);
    this.tooltip.show(this.anchorEl.nativeElement, this.content, this.align, this.inert);
    return true;
  }
}
