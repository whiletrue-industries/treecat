import { computed, effect, Injectable, signal } from '@angular/core';
import { ClimateArea, DataService, SidewalkWidth, Tree } from './data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

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
