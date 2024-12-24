import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tree } from '../data.service';
import { environment } from '../../environments/environment';
import { Router, RouterModule } from '@angular/router';
import { StateService } from '../state.service';
import { ClickOnReturnDirective } from '../click-on-return.directive';

@Component({
  selector: 'app-tree-card',
  imports: [
    RouterModule,
    ClickOnReturnDirective
  ],
  templateUrl: './tree-card.component.html',
  styleUrl: './tree-card.component.less'
})
export class TreeCardComponent {
  @Input() tree: Tree;
  @Input() catalog = false;
  @Output() loaded = new EventEmitter<void>();

  // TODO
  DEFAULT_URL = `${environment.base}no-tree-image.jpg`;

  constructor(public state: StateService, private router: Router) {}

  markAsLoaded() {
    this.loaded.emit();
  }

  open() {
    if (this.catalog && this.state.selectedTree()) {
      this.state.selectedTree.set(this.tree);
    } else {
      this.router.navigate(['/tree', this.tree.id]);
    }
  }
}
