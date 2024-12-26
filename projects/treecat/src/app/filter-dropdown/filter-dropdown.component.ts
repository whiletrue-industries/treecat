import { Component, effect, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterConfig } from '../filters/config';
import { StateService } from '../state.service';

@Component({
  selector: 'app-filter-dropdown',
  imports: [
    FormsModule
  ],
  templateUrl: './filter-dropdown.component.html',
  styleUrl: './filter-dropdown.component.less'
})
export class FilterDropdownComponent {

  @Input() config: FilterConfig<any>;

  currentValue_ = 'all';

  constructor(public state: StateService) {
    effect(() => {
      const value = this.state.filters[this.config.slug].value();
      if (value && value.length) {
        this.currentValue_ = value[0].key;
      } else {
        this.currentValue_ = 'all';
      }
    });
  }

  get currentValue() {
    return this.currentValue_;
  }

  set currentValue(value: string) {
    this.currentValue_ = value;
    const option = this.config.options.find(o => o.key === value);
    if (option) {
      this.state.filters[this.config.slug].value.set([option]);
    }
  }
}
