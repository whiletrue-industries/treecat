import { Component, Input } from '@angular/core';
import { Tree, BloomColor, CanopyShape, BLOOM_COLOR_NAME_MAP } from '../data.service';
import { environment } from '../../environments/environment';
import { TooltipComponent } from "../tooltip/tooltip.component";
import { TooltipIconComponent } from "../tooltip-icon/tooltip-icon.component";
import { TooltipIconDeciduousComponent } from "../tooltip-icon-deciduous/tooltip-icon-deciduous.component";
import { TooltipIconBrittlenessComponent } from "../tooltip-icon-brittleness/tooltip-icon-brittleness.component";
import { TooltipIconNectarComponent } from "../tooltip-icon-nectar/tooltip-icon-nectar.component";
import { TooltipIconSpeciesValueComponent } from "../tooltip-icon-species-value/tooltip-icon-species-value.component";
import { TooltipIconSoilTypeComponent } from "../tooltip-icon-soil-type/tooltip-icon-soil-type.component";
import { TooltipIconNativeComponent } from "../tooltip-icon-native/tooltip-icon-native.component";
import { TooltipWrapperComponent } from "../tooltip-wrapper/tooltip-wrapper.component";
import { TooltipAlignments } from '../tooltip.service';
import { TooltipIconWateringScaleComponent } from "../tooltip-icon-watering-scale/tooltip-icon-watering-scale.component";

export function canopyShapeImg(canopyShape: CanopyShape) {
  if (!canopyShape) return '';
  return `${environment.base}img/canopy-shape-${canopyShape.toLowerCase()}-256.png`;
}

export function bloomColorImg(color: BloomColor) {
  return `${environment.base}img/color-${color.toLowerCase().replace(' ', '-')}.png`;
}

export function wateringScaleImg(wateringScale: number) {
  const amount = wateringScale ? Math.round(wateringScale) : 0;
  return Array.from({ length: 4 }, (_, i) => i < amount ? DROP_ICON : DROP_EMPTY_ICON);
}

export const DROP_ICON = `${environment.base}img/icon-drop.svg`;
export const DROP_EMPTY_ICON = `${environment.base}img/icon-drop-empty.svg`;

@Component({
  selector: 'app-tree-info',
  imports: [TooltipIconDeciduousComponent, TooltipIconBrittlenessComponent, TooltipIconNectarComponent, TooltipIconSpeciesValueComponent, TooltipIconSoilTypeComponent, TooltipIconNativeComponent, TooltipWrapperComponent, TooltipIconWateringScaleComponent],
  templateUrl: './tree-info.component.html',
  styleUrl: './tree-info.component.less'
})
export class TreeInfoComponent {
  @Input() tree: Tree;
  @Input() tooltipPosition: 'left' | 'right' = 'right';

  canopyShapeImg() {
    return canopyShapeImg(this.tree.canopyShape);
  }

  bloomColorImg(color: BloomColor) {
    return bloomColorImg(color);
  }

  bloomColorName(color: BloomColor) {
    return BLOOM_COLOR_NAME_MAP[color];
  }

  wateringScaleImg() {
    return wateringScaleImg(this.tree.wateringScale);
  }

  tp(side: string): TooltipAlignments {
    return side === 'top' ? (
      this.tooltipPosition === 'right' ? 'top-right' : 'top-left'
    ) : (
      this.tooltipPosition === 'right' ? 'bottom-right' : 'bottom-left'
    )
  }
}
