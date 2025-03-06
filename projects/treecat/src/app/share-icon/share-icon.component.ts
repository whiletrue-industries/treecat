import { Component } from '@angular/core';
import { delay, Subject, tap, throttle, throttleTime } from 'rxjs';
import { ClickOnReturnDirective } from '../click-on-return.directive';

@Component({
  selector: 'app-share-icon',
  imports: [
    ClickOnReturnDirective
  ],
  templateUrl: './share-icon.component.html',
  styleUrl: './share-icon.component.less'
})
export class ShareIconComponent {
  
  clipboardSupported = false;
  copied = new Subject<void>();
  showTooltip = false;

  constructor() {
    try {
      this.clipboardSupported = document.queryCommandSupported && document.queryCommandSupported('copy');
    } catch (e) {
      console.log('Failed to check if copy clipboard is available');
    }
    this.copied.pipe(
      tap(() => {
        this.showTooltip = true;
      }),
      delay(3000),
    ).subscribe(() => {
      this.showTooltip = false;
    });
  }

  clipboardCopy() {
    if (!this.clipboardSupported || this.showTooltip) {
      return;
    }
    const text = window.location.href;
    const txt = document.createElement('textarea');
    txt.textContent = text;
    txt.classList.add('visually-hidden');
    document.body.appendChild(txt);
    txt.select();
    try {
      document.execCommand('copy');
      this.copied.next();
    } catch (ex) {
    } finally {
      document.body.removeChild(txt);
    }
  }

}
