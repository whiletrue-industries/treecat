import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, fromEvent, take } from 'rxjs';
import { PlatformService } from '../platform.service';
import { ClickOnReturnDirective } from '../click-on-return.directive';

@UntilDestroy()
@Component({
  selector: 'app-modal',
  imports: [
    ClickOnReturnDirective
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.less'
})
export class ModalComponent implements OnInit {

  @Input() kind = 'default';
  @Output() close = new EventEmitter<void>();

  constructor(private platform: PlatformService) {}

  ngOnInit(): void {
    this.platform.browser(() => {
      fromEvent<KeyboardEvent>(window, 'keydown').pipe(
        untilDestroyed(this),
        take(1),
        filter((e: KeyboardEvent) => e.key === 'Escape')
      ).subscribe(() => this.closeModal());  
    });
  }

  closeModal(): void {
    this.close.emit();
  }
}
