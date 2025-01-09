import { Injectable, signal } from '@angular/core';
import { fromEvent, filter, take } from 'rxjs';

export type TooltipAlignments = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  top = signal(1);
  // right = signal(1);
  left = signal(1);
  align = signal('left');
  content = signal('');

  visible = signal(false);
  
  constructor() { }

  show(el: Element, content: string, align: TooltipAlignments = 'bottom-left') {
    if (this.visible() && this.content() === content) {
      console.log('already showing this tooltip');
      return;
    }
    const rect = el.getBoundingClientRect();
    if (align.indexOf('bottom-') === 0) {
      this.top.set(rect.top + window.scrollY);
    } else if (align.indexOf('top-') === 0) {
      this.top.set(rect.bottom + window.scrollY);
    }
    // this.right.set(window.innerWidth - el.getBoundingClientRect().right);
    this.left.set(rect.left + rect.width / 2);
    this.align.set(align);
    this.content.set(content);
    this.visible.set(true); 
    fromEvent(el, 'mouseout').pipe(
      take(1)
    ).subscribe(() => {
      console.log('hiding tooltip');
      this.hide();
    });
 
  }

  hide() {
    this.visible.set(false);
  }
}
