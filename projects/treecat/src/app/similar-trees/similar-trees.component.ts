import { Component, Input } from '@angular/core';
import { Tree } from '../data.service';

@Component({
  selector: 'app-similar-trees',
  imports: [],
  templateUrl: './similar-trees.component.html',
  styleUrl: './similar-trees.component.less'
})
export class SimilarTreesComponent {
  @Input() tree: Tree;
}
