import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FilterConfig, FilterOption } from '../filters/config';
import { StateService } from '../state.service';

@Component({
  selector: 'app-filter-multiple-select',
  imports: [],
  templateUrl: './filter-multiple-select.component.html',
  styleUrl: './filter-multiple-select.component.less'
})
export class FilterMultipleSelectComponent implements OnChanges {
  @Input() config: FilterConfig<any>;

  checked: FilterOption<any>[] = [];

  constructor(private state: StateService) {}

  ngOnChanges(): void {
    this.checked = this.state.filters[this.config.slug].value();
  }

  isChecked(option: FilterOption<any>) {
    return this.checked.map(v => v.key).includes(option.key);
  }

  onChange(event: Event, option: FilterOption<any>) {
    const value = (event.target as HTMLInputElement).checked;
    this.checked = this.checked.filter(v => v.key !== option.key);
    if (value) {
      this.checked.push(option);
    }
    this.state.filters[this.config.slug].value.set(this.checked);
  }
}
