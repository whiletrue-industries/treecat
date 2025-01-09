import { Component } from '@angular/core';

import { FC_CLIMATE_AREAS, FC_SIDEWALK_WIDTHS, FC_TREE_CATALOGS, FC_TREE_TYPES, FC_CANOPY_WIDTH, FC_CANOPY_HEIGHT, FC_WATERING_SCALE, FC_GROWTH_RATE, FC_DECIDUOUS, FC_ECONOMICAL, FC_BLOOM_COLOR, FC_CANOPY_SHAPE } from './config';
import { FilterDropdownComponent } from '../filter-dropdown/filter-dropdown.component';
import { FilterMultipleSelectComponent } from '../filter-multiple-select/filter-multiple-select.component';
import { FilterMultipleSelectColorsComponent } from '../filter-multiple-select-colors/filter-multiple-select-colors.component';
import { FilterMultipleSelectCanopyComponent } from '../filter-multiple-select-canopy/filter-multiple-select-canopy.component';
import { FilterTogglesComponent } from '../filter-toggles/filter-toggles.component';

@Component({
  selector: 'app-filters',
  imports: [
    FilterDropdownComponent,
    FilterMultipleSelectComponent,
    FilterMultipleSelectColorsComponent,
    FilterMultipleSelectCanopyComponent,
    FilterTogglesComponent
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.less'
})
export class FiltersComponent {
  
  FC_SIDEWALK_WIDTHS = FC_SIDEWALK_WIDTHS;
  FC_CLIMATE_AREAS = FC_CLIMATE_AREAS;
  FC_TREE_TYPES = FC_TREE_TYPES;
  FC_TREE_CATALOGS = FC_TREE_CATALOGS;
  FC_CANOPY_WIDTH = FC_CANOPY_WIDTH;
  FC_CANOPY_SHAPE = FC_CANOPY_SHAPE;
  FC_CANOPY_HEIGHT = FC_CANOPY_HEIGHT;
  FC_BLOOM_COLOR = FC_BLOOM_COLOR;
  FC_WATERING_SCALE = FC_WATERING_SCALE;
  FC_GROWTH_RATE = FC_GROWTH_RATE;
  FC_ECONOMICAL = FC_ECONOMICAL;
  FC_DECIDUOUS = FC_DECIDUOUS;

  extraFilters = false;
  
  constructor() {}
}
