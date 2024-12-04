import { Component, Input } from '@angular/core';
import { Tree } from '../data.service';

@Component({
  selector: 'app-tree-gallery',
  imports: [],
  templateUrl: './tree-gallery.component.html',
  styleUrl: './tree-gallery.component.less'
})
export class TreeGalleryComponent {
  @Input() tree: Tree;
}
