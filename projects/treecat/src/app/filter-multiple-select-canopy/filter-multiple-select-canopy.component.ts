import { Component, Input } from '@angular/core';
import { BloomColor, CanopyShape } from '../data.service';
import { FilterConfig, FilterOption } from '../filters/config';
import { StateService } from '../state.service';
import { canopyShapeImg } from '../tree-info/tree-info.component';
import { ClickOnReturnDirective } from '../click-on-return.directive';

@Component({
  selector: 'app-filter-multiple-select-canopy',
  imports: [
    ClickOnReturnDirective
  ],
  templateUrl: './filter-multiple-select-canopy.component.html',
  styleUrl: './filter-multiple-select-canopy.component.less'
})
export class FilterMultipleSelectCanopyComponent {
  @Input() config: FilterConfig<any>;


  canopyShapeImg = canopyShapeImg;
  
  constructor(private state: StateService) {}

  get checked() {
    return this.state.filters[this.config.slug].value();
  }

  isChecked(option: FilterOption<any>) {
    return this.checked.map(v => v.key).includes(option.key);
  }

  onChange(option: FilterOption<any>) {
    const value = !this.isChecked(option);
    const checked = this.checked.filter(v => v.key !== option.key);
    if (value) {
      checked.push(option);
    }
    this.state.filters[this.config.slug].value.set(checked);
  }

}
