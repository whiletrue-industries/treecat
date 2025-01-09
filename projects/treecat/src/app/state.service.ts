import { computed, effect, Injectable, signal, WritableSignal } from '@angular/core';
import { ClimateArea, DataService, SidewalkWidth, Tree } from './data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

import { FilterConfig, FilterOption,
  FC_SIDEWALK_WIDTHS, FC_CLIMATE_AREAS, FC_TREE_TYPES, FC_TREE_CATALOGS,
  FC_CANOPY_WIDTH,
  FC_CANOPY_HEIGHT,
  FC_WATERING_SCALE,
  FC_GROWTH_RATE,
  FC_DECIDUOUS,
  FC_ECONOMICAL,
  FC_BLOOM_COLOR,
  FC_CANOPY_SHAPE
 } from './filters/config';
import { text } from 'stream/consumers';


type Filter<T> = {
  config: FilterConfig<T>;
  value: WritableSignal<FilterOption<T>[]>;
};

@Injectable({
  providedIn: 'root'
})
export class StateService {

  selectedTree = signal<Tree | null>(null);
  trees = signal<Tree[]>([]);

  cart = signal<Tree[]>([]);
  cartIds = computed(() => this.cart().map(t => t.id));
  cartSize = computed(() => this.cart().length);

  routeProcessed = false;

  firstDialogShown = false;

  filters: {[key: string]: Filter<any>} = {
    [FC_SIDEWALK_WIDTHS.slug]: {
      config: FC_SIDEWALK_WIDTHS,
      value: signal([])
    },
    [FC_CLIMATE_AREAS.slug]: {
      config: FC_CLIMATE_AREAS,
      value: signal([])
    },
    [FC_TREE_TYPES.slug]: {
      config: FC_TREE_TYPES,
      value: signal([])
    },
    [FC_TREE_CATALOGS.slug]: {
      config: FC_TREE_CATALOGS,
      value: signal([])
    },
    [FC_CANOPY_WIDTH.slug]: {
      config: FC_CANOPY_WIDTH,
      value: signal([])
    },
    [FC_CANOPY_SHAPE.slug]: {
      config: FC_CANOPY_SHAPE,
      value: signal([])
    },
    [FC_CANOPY_HEIGHT.slug]: {
      config: FC_CANOPY_HEIGHT,
      value: signal([])
    },
    [FC_BLOOM_COLOR.slug]: {
      config: FC_BLOOM_COLOR,
      value: signal([])
    },
    // [FC_WATERING_SCALE.slug]: {
    //   config: FC_WATERING_SCALE,
    //   value: signal([])
    // },
    [FC_GROWTH_RATE.slug]: {
      config: FC_GROWTH_RATE,
      value: signal([])
    },
    [FC_ECONOMICAL.slug]: {
      config: FC_ECONOMICAL,
      value: signal([])
    },
    [FC_DECIDUOUS.slug]: {
      config: FC_DECIDUOUS,
      value: signal([])
    }
  };
  textFilter = signal<string|null>(null);
  TOP_FILTER_SLUGS = [FC_SIDEWALK_WIDTHS.slug, FC_CLIMATE_AREAS.slug, FC_TREE_TYPES.slug, FC_TREE_CATALOGS.slug];

  filteredTrees = computed(() => {
    let filteredTrees = this.trees();
    for (const filter of Object.values(this.filters)) {
      const value = filter.value();
      if (value && value.length > 0) {
        filteredTrees = filteredTrees.filter(t => filter.config.filter(t, value));
      }
    }
    const textFilter = this.textFilter() || null;
    if (textFilter) {
      filteredTrees = filteredTrees.filter(t => {
        return (
          t.name.includes(textFilter) ||
          t.botanicalName.toLowerCase().includes(textFilter.toLowerCase()) 
        );
      });
    }
    return filteredTrees;
  });

  constructor(private data: DataService, private router: Router, private route: ActivatedRoute) {
    data.trees.subscribe(trees => {
      this.trees.set(trees);
      route.queryParams.pipe(
        first()
      ).subscribe(params => {
        if (params['cart']) {
          const ids: string[] = params['cart'].split(',');
          const cart: Tree[] = ids.map(id => trees.find(t => t.id === id)).filter(t => !!t);
          this.cart.set(cart);
        }
        this.routeProcessed = true;
      });
    });
    effect(() => {
      const qp = {
        cart: this.cartIds().join(',')
      };
      if (this.routeProcessed) {
        this.router.navigate([], { queryParams: qp, replaceUrl: true });
      }    
    });
  }

  filterTrees(tree: Tree) {
    return this.trees().filter((t: Tree) => {
      return (
        (t.id !== tree.id) &&
        (t.sidewalkWidth === tree.sidewalkWidth) &&
        (t.climateArea.some(area => tree.climateArea.includes(area)))
      );
    }); 
  }

  isInCart(tree: Tree) {
    return tree && this.cartIds().includes(tree.id);
  }

  addToCart(tree: Tree) {
    if (!this.isInCart(tree)) {
      this.cart.set([...this.cart(), tree]);
    }
  }

  removeFromCart(tree: Tree) {
    if (this.isInCart(tree)) {
      this.cart.set(this.cart().filter(t => t.id !== tree.id));
    }
  }

  moveBeforeInCart(tree: Tree) {
    const index = this.cart().findIndex(t => t.id === tree.id);
    if (index > 0) {
      const cart = [...this.cart()];
      cart.splice(index, 1);
      cart.splice(index - 1, 0, tree);
      this.cart.set(cart);
    }
  }

  moveAfterInCart(tree: Tree) {
    const index = this.cart().findIndex(t => t.id === tree.id);
    if (index < this.cart().length - 1) {
      const cart = [...this.cart()];
      cart.splice(index, 1);
      cart.splice(index + 1, 0, tree);
      this.cart.set(cart);
    }
  }

  clearAllFilters() {
    for (const filter of Object.values(this.filters)) {
      if (!this.TOP_FILTER_SLUGS.includes(filter.config.slug)) {
        filter.value.set([]);
      }
    }
    this.textFilter.set(null);
  }

  clearOneFilter(config: FilterConfig<any>, option: FilterOption<any>) {
    this.filters[config.slug].value.set(this.filters[config.slug].value().filter(v => v.key !== option.key));    
  }

  // selectedSidewalkWidth: SidewalkWidth | null = null;
  get selectedSidewalkWidth() {
    return this.filters[FC_SIDEWALK_WIDTHS.slug].value()[0]?.value || null;
  }

  set selectedSidewalkWidth(value: SidewalkWidth | null) {
    const option = FC_SIDEWALK_WIDTHS.options.find(o => o.value === value);
    this.filters[FC_SIDEWALK_WIDTHS.slug].value.set(option ? [option] : []);
  }

  set selectedClimateArea(value: ClimateArea | null) {
    const option = FC_CLIMATE_AREAS.options.find(o => o.value === value);
    this.filters[FC_CLIMATE_AREAS.slug].value.set(option ? [option] : []);
  }
}
