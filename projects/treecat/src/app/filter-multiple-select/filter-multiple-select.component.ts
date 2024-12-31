import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FilterConfig, FilterOption } from '../filters/config';
import { StateService } from '../state.service';
import { ClickOnReturnDirective } from '../click-on-return.directive';

@Component({
  selector: 'app-filter-multiple-select',
  imports: [],
  templateUrl: './filter-multiple-select.component.html',
  styleUrl: './filter-multiple-select.component.less'
})
export class FilterMultipleSelectComponent  {
  @Input() config: FilterConfig<any>;

  constructor(private state: StateService) {}

  get checked() {
    if (!this.config) {
      return [];
    }
    return this.state.filters[this.config.slug].value();
  }

  isChecked(option: FilterOption<any>) {
    return this.checked.map(v => v.key).includes(option.key);
  }

  onChange(event: Event, option: FilterOption<any>) {
    const value = (event.target as HTMLInputElement).checked;
    const checked = this.checked.filter(v => v.key !== option.key);
    if (value) {
      checked.push(option);
    }
    this.state.filters[this.config.slug].value.set(checked);
  }
}
