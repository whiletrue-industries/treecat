import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService, Tree } from '../data.service';
import { environment } from '../../environments/environment';
import { Router, RouterModule } from '@angular/router';
import { StateService } from '../state.service';
import { ClickOnReturnDirective } from '../click-on-return.directive';
import { TooltipComponent } from "../tooltip/tooltip.component";
import { TooltipWrapperComponent } from "../tooltip-wrapper/tooltip-wrapper.component";

@Component({
  selector: 'app-tree-card',
  imports: [
    RouterModule,
    ClickOnReturnDirective,
    TooltipWrapperComponent
],
  templateUrl: './tree-card.component.html',
  styleUrl: './tree-card.component.less'
})
export class TreeCardComponent {
  @Input() tree: Tree;
  @Input() catalog = false;
  @Output() loaded = new EventEmitter<void>();

  constructor(public state: StateService, public data: DataService, private router: Router) {}

  markAsLoaded() {
    this.loaded.emit();
  }

  open() {
    if (this.catalog && this.state.selectedTree()) {
      this.state.selectedTree.set(this.tree);
    } else {
      this.router.navigate(['/tree', this.tree.id], { queryParamsHandling: 'preserve'});
    }
  }
}
