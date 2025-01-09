import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TooltipService } from '../tooltip.service';

@Component({
  selector: 'app-tooltip-wrapper',
  imports: [],
  templateUrl: './tooltip-wrapper.component.html',
  styleUrl: './tooltip-wrapper.component.less'
})
export class TooltipWrapperComponent {
  @Input() align: 'left' | 'right' = 'left';

  content = '';
  @ViewChild('anchor') anchorEl: ElementRef;
  @ViewChild('content') contentEl: ElementRef;

  constructor(private tooltip: TooltipService) {}

  ngAfterViewInit() {
    this.content = this.contentEl.nativeElement.innerHTML;
  }

  show() {
    console.log('showing tooltip');
    this.tooltip.show(this.anchorEl.nativeElement, this.content, this.align);
  }
}
