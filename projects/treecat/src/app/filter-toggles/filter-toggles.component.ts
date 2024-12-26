import { Component, effect } from '@angular/core';
import { StateService } from '../state.service';
import { FC_BLOOM_COLOR, FC_CLIMATE_AREAS, FC_SIDEWALK_WIDTHS, FC_TREE_CATALOGS, FC_TREE_TYPES, FilterConfig, FilterOption } from '../filters/config';
import { config } from 'process';
import { bloomColorImg } from '../tree-info/tree-info.component';
import { ClickOnReturnDirective } from '../click-on-return.directive';

type Toggle = {
  id: string;
  config: FilterConfig<any>;
  option: FilterOption<any>;
};

@Component({
  selector: 'app-filter-toggles',
  imports: [
    ClickOnReturnDirective
  ],
  templateUrl: './filter-toggles.component.html',
  styleUrl: './filter-toggles.component.less'
})
export class FilterTogglesComponent {

  toggles: Toggle[] = [];
  COLOR_SLUG = FC_BLOOM_COLOR.slug;
  bloomColorImg = bloomColorImg;

  constructor(public state: StateService) {
    effect(() => {
      this.toggles = [];
      Object.values(state.filters).forEach(filter => {
        if (this.state.TOP_FILTER_SLUGS.includes(filter.config.slug)) return;
        this.toggles.push(...filter.value().map(option => ({id: filter.config.slug + option.key, config: filter.config, option: option})));
      });
    });
  }
}
