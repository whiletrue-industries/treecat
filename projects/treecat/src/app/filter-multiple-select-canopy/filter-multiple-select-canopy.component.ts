import { Component, Input } from '@angular/core';
import { BloomColor, CanopyShape } from '../data.service';
import { FilterConfig, FilterOption } from '../filters/config';
import { StateService } from '../state.service';
import { canopyShapeImg } from '../tree-info/tree-info.component';

@Component({
  selector: 'app-filter-multiple-select-canopy',
  imports: [],
  templateUrl: './filter-multiple-select-canopy.component.html',
  styleUrl: './filter-multiple-select-canopy.component.less'
})
export class FilterMultipleSelectCanopyComponent {
  @Input() config: FilterConfig<any>;

  checked: FilterOption<CanopyShape>[] = [];

  canopyShapeImg = canopyShapeImg;
  
  constructor(private state: StateService) {}

  ngOnChanges(): void {
    this.checked = this.state.filters[this.config.slug].value();
  }

  isChecked(option: FilterOption<any>) {
    return this.checked.map(v => v.key).includes(option.key);
  }

  onChange(option: FilterOption<any>) {
    const value = !this.isChecked(option);
    this.checked = this.checked.filter(v => v.key !== option.key);
    if (value) {
      this.checked.push(option);
    }
    this.state.filters[this.config.slug].value.set(this.checked);
  }

}