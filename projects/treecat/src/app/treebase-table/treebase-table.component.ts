import { Component, Input } from '@angular/core';
import { Tree } from '../data.service';

@Component({
  selector: 'app-treebase-table',
  imports: [],
  templateUrl: './treebase-table.component.html',
  styleUrl: './treebase-table.component.less'
})
export class TreebaseTableComponent {
  @Input() tree: Tree;
}
