import { Component, Input } from '@angular/core';
import { Tree, BloomColor, CanopyShape } from '../data.service';
import { environment } from '../../environments/environment';

export function canopyShapeImg(canopyShape: CanopyShape) {
  return `${environment.base}img/canopy-shape-${canopyShape.toLowerCase()}-256.png`;
}

export function bloomColorImg(color: BloomColor) {
  return `${environment.base}img/color-${color.toLowerCase().replace(' ', '-')}.png`;
}

export function wateringScaleImg(wateringScale: number) {
  const amount = wateringScale ? Math.round(wateringScale) : 0;
  return Array.from({ length: amount }, (_, i) => i);
}

export const DROP_ICON = `${environment.base}img/icon-drop.svg`;

@Component({
  selector: 'app-tree-info',
  imports: [],
  templateUrl: './tree-info.component.html',
  styleUrl: './tree-info.component.less'
})
export class TreeInfoComponent {
  @Input() tree: Tree;

  DROP_ICON = DROP_ICON;

  canopyShapeImg() {
    return canopyShapeImg(this.tree.canopyShape);
  }

  bloomColorImg(color: BloomColor) {
    return bloomColorImg(color);
  }

  wateringScaleImg() {
    return wateringScaleImg(this.tree.wateringScale);
  }
}
