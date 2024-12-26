import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, fromEvent, take } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.less'
})
export class ModalComponent implements OnInit {

  @Input() kind = 'default';
  @Output() close = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    fromEvent<KeyboardEvent>(window, 'keydown').pipe(
      untilDestroyed(this),
      take(1),
      filter((e: KeyboardEvent) => e.key === 'Escape')
    ).subscribe(() => this.closeModal());
  }

  closeModal(): void {
    this.close.emit();
  }
}
