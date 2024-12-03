import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Tree } from '../data.service';
import { PlatformService } from '../platform.service';
import { fromEvent, timer } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TreeCardComponent } from '../tree-card/tree-card.component';

@UntilDestroy()
@Component({
  selector: 'app-card-grid',
  imports: [
    TreeCardComponent
  ],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.less'
})
export class CardGridComponent {

  @Input() trees: Tree[] = [];

  @ViewChild('treeCards') treeCards: ElementRef;

  constructor(private platform: PlatformService) {
  }

  ngAfterViewInit(): void {
    this.platform.browser(() => {
      this.resizeGroupItems();
      fromEvent(window, 'resize').pipe(
        untilDestroyed(this),
      ).subscribe(() => {
        this.resizeGroupItems();
      });
    });
  }

  resizeGroupItems() {
    this.platform.browser(() => {
      timer(0).subscribe(() => {
        console.log('resize');
        const el = this.treeCards.nativeElement as HTMLElement;
        const items = el.querySelectorAll('app-tree-card') as NodeListOf<HTMLElement>;
        items.forEach((item: HTMLElement) => {
          const rowHeight = parseInt(getComputedStyle(el).getPropertyValue('grid-auto-rows'));
          const colGap = parseInt(getComputedStyle(el).getPropertyValue('grid-column-gap'));
          const rowSpan = Math.ceil(((item.getBoundingClientRect().height + colGap)/rowHeight));
          // const rowSpan = Math.ceil((item.getBoundingClientRect().height + rowGap)/(rowHeight + rowGap));
          // console.log('resize item', item.getBoundingClientRect().height, rowHeight, rowGap, rowSpan);
          item.style.gridRowEnd = 'span ' + rowSpan;
        });
      });
    });
  }

}

