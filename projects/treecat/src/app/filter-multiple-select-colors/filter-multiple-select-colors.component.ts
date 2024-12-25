import { Component, Input } from '@angular/core';
import { FilterConfig, FilterOption } from '../filters/config';
import { StateService } from '../state.service';
import { BloomColor } from '../data.service';
import { bloomColorImg } from '../tree-info/tree-info.component';

@Component({
  selector: 'app-filter-multiple-select-colors',
  imports: [],
  templateUrl: './filter-multiple-select-colors.component.html',
  styleUrl: './filter-multiple-select-colors.component.less'
})
export class FilterMultipleSelectColorsComponent {
  @Input() config: FilterConfig<any>;

  checked: FilterOption<BloomColor>[] = [];

  bloomColorImg = bloomColorImg;
  
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