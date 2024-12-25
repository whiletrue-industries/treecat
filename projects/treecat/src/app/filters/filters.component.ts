import { Component } from '@angular/core';

import { FC_CLIMATE_AREAS, FC_SIDEWALK_WIDTHS, FC_TREE_CATALOGS, FC_TREE_TYPES } from './config';
import { FilterDropdownComponent } from '../filter-dropdown/filter-dropdown.component';

@Component({
  selector: 'app-filters',
  imports: [
    FilterDropdownComponent
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.less'
})
export class FiltersComponent {
  
  FC_SIDEWALK_WIDTHS = FC_SIDEWALK_WIDTHS;
  FC_CLIMATE_AREAS = FC_CLIMATE_AREAS;
  FC_TREE_TYPES = FC_TREE_TYPES;
  FC_TREE_CATALOGS = FC_TREE_CATALOGS;

  constructor() {}
}
