import { Component, Input } from '@angular/core';
import { Tree, BloomColor } from '../data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tree-info',
  imports: [],
  templateUrl: './tree-info.component.html',
  styleUrl: './tree-info.component.less'
})
export class TreeInfoComponent {
  @Input() tree: Tree;

  DROP_ICON = `${environment.base}img/icon-drop.svg`;

  canopyShapeImg() {
    return `${environment.base}img/canopy-shape-${this.tree.canopyShape.toLowerCase()}-256.png`;
  }

  bloomColorImg(color: BloomColor) {
    return `${environment.base}img/color-${color.toLowerCase().replace(' ', '-')}.png`;
  }

  wateringScaleImg() {
    const amount = this.tree.wateringScale ? Math.round(this.tree.wateringScale) : 0;
    return Array.from({ length: amount }, (_, i) => i);
  }
}
