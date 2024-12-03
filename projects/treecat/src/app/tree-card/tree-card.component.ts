import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tree } from '../data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tree-card',
  imports: [],
  templateUrl: './tree-card.component.html',
  styleUrl: './tree-card.component.less'
})
export class TreeCardComponent {
  @Input() tree: Tree;
  @Output() loaded = new EventEmitter<void>();

  // TODO
  DEFAULT_URL = `${environment.base}no-tree-image.jpg`;

  markAsLoaded() {
    this.loaded.emit();
  }
}
