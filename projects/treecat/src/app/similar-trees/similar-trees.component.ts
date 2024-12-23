import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Tree } from '../data.service';
import { CardGridComponent } from '../card-grid/card-grid.component';
import { StateService } from '../state.service';

@Component({
  selector: 'app-similar-trees',
  imports: [
    CardGridComponent
  ],
  templateUrl: './similar-trees.component.html',
  styleUrl: './similar-trees.component.less'
})
export class SimilarTreesComponent implements OnChanges {
  @Input() tree: Tree;
  filteredTrees: Tree[] = [];

  constructor(public state: StateService) {
  }

  ngOnChanges(): void {
    this.filteredTrees = this.state.filterTrees(this.tree);
  }
}
