import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { After } from 'v8';
import { TooltipService } from '../tooltip.service';

@Component({
  selector: 'app-tooltip-icon',
  imports: [],
  templateUrl: './tooltip-icon.component.html',
  styleUrl: './tooltip-icon.component.less'
})
export class TooltipIconComponent implements AfterViewInit {

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
