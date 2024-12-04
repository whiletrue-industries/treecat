import { Component, Input } from '@angular/core';
import { Tree } from '../data.service';

@Component({
  selector: 'app-treebase-info',
  imports: [],
  templateUrl: './treebase-info.component.html',
  styleUrl: './treebase-info.component.less'
})
export class TreebaseInfoComponent {
  @Input() tree: Tree;
}
