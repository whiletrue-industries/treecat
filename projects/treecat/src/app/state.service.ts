import { computed, effect, Injectable, signal, WritableSignal } from '@angular/core';
import { ClimateArea, DataService, SidewalkWidth, Tree } from './data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

import { FilterConfig, FilterOption,
  FC_SIDEWALK_WIDTHS, FC_CLIMATE_AREAS, FC_TREE_TYPES, FC_TREE_CATALOGS
 } from './filters/config';


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

  selectedSidewalkWidth: SidewalkWidth | null = null;
  selectedClimateArea: ClimateArea | null = null;

  cart = signal<Tree[]>([]);
  cartIds = computed(() => this.cart().map(t => t.id));
  cartSize = computed(() => this.cart().length);

  routeProcessed = false;

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
    }
  };
  filteredTrees = computed(() => {
    let filteredTrees = this.trees();
    for (const filter of Object.values(this.filters)) {
      const value = filter.value();
      if (value && value.length > 0) {
        console.log('Filtering by', value, filteredTrees.map(t => t.sidewalkWidth));
        filteredTrees = filteredTrees.filter(t => filter.config.filter(t, value));
      }
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
}
