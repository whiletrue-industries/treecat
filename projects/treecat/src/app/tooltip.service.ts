import { Injectable, signal } from '@angular/core';
import { fromEvent, filter, take, concat, map, Subject, debounceTime } from 'rxjs';

export type TooltipAlignments = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  top = signal(1);
  // right = signal(1);
  left = signal(1);
  align = signal<TooltipAlignments>('bottom-left');
  content = signal('');
  lastEl: Element | null = null;
  keeping = false;

  visible = signal(false);
  inert = signal(false);

  hider = new Subject<void>();
  
  constructor() {
    this.hider.pipe(
      debounceTime(100),
      filter(() => !this.keeping)
    ).subscribe(() => {
      this.hide();
    });
  }

  show(el: Element, content: string, align: TooltipAlignments = 'bottom-left', inert=false) {
    if (this.visible() && this.lastEl === el) {
      // console.log('already showing this tooltip');
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
    this.inert.set(inert);
    this.lastEl = el;
    fromEvent(el, 'mouseout').pipe(
      take(1)
    ).subscribe(() => {
      // console.log('mouse out', el);
      this.hider.next();
    });

  }

  keep() {
    // console.log('keeping');
    this.keeping = true;
  }

  unkeep() {
    // console.log('unkeeping');
    this.keeping = false;
    this.lastEl = null;
    this.hider.next();
  }

  hide() {
    // console.log('hiding');
    this.visible.set(false);
    this.lastEl = null;
    this.keeping = false;
  }
}
