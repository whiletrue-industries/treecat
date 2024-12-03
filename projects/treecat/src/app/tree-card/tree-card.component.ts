import { Component, Input } from '@angular/core';
import { Tree } from '../data.service';

@Component({
  selector: 'app-tree-card',
  imports: [],
  templateUrl: './tree-card.component.html',
  styleUrl: './tree-card.component.less'
})
export class TreeCardComponent {
  @Input() tree: Tree;

  DEFAULT_URL = '/no-tree-image.jpg';
}
