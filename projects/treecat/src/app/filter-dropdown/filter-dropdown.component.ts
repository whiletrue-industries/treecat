import { Component, Input } from '@angular/core';
import { FilterConfig } from '../filters/config';
import { StateService } from '../state.service';

@Component({
  selector: 'app-filter-dropdown',
  imports: [],
  templateUrl: './filter-dropdown.component.html',
  styleUrl: './filter-dropdown.component.less'
})
export class FilterDropdownComponent {

  @Input() config: FilterConfig<any>;

  constructor(public state: StateService) {}

  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const option = this.config.options.find(o => o.key === value);
    if (option) {
      this.state.filters[this.config.slug].value.set([option]);
    }
  }

  getCurrentValue() {
    const value = this.state.filters[this.config.slug].value();
    if (value && value.length) {
      return value[0].key;
    }
    return 'all';
  }
}
