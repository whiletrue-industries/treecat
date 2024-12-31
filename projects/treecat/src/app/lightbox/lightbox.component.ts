import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClickOnReturnDirective } from '../click-on-return.directive';
import { Photo } from '../data.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, take, filter } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CartIconComponent } from "../cart-icon/cart-icon.component";

@UntilDestroy()
@Component({
  selector: 'app-lightbox',
  imports: [
    RouterModule,
    ClickOnReturnDirective,
    CartIconComponent
],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.less'
})
export class LightboxComponent implements OnInit {

  @Input() photos: Photo[];
  @Input() index = 0;
  @Output() close = new EventEmitter<void>();

    constructor(private el: ElementRef) {}
  
    ngOnInit(): void {
      fromEvent<KeyboardEvent>(window, 'keydown').pipe(
        untilDestroyed(this),
      ).subscribe((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          this.closeLightbox()
        } else if (e.key === 'ArrowRight') {
          this.prev();
        } else if (e.key === 'ArrowLeft') {
          this.next();
        }
      });
    }
  
  closeLightbox() {
    this.close.emit();
  }

  prev() {
    this.index = (this.index + this.photos.length - 1) % this.photos.length;
  } 

  next() {
    this.index = (this.index + 1) % this.photos.length;
  }
}
