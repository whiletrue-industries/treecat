import { computed, Injectable, signal } from '@angular/core';
import { ClimateArea, DataService, SidewalkWidth, Tree } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  selectedTree = signal<Tree | null>(null);
  trees = signal<Tree[]>([]);

  selectedSidewalkWidth: SidewalkWidth | null = null;
  selectedClimateArea: ClimateArea | null = null;

  cart = signal<string[]>([]);

  constructor(private data: DataService) {
    data.trees.subscribe(trees => {
      this.trees.set(trees);
    });
  }

  filterTrees(tree: Tree) {
    return this.trees().filter((t: Tree) => {
      return (
        (t.sidewalkWidth === tree.sidewalkWidth) &&
        (t.climateArea.some(area => tree.climateArea.includes(area)))
      );
    }); 
  }

  isInCart(tree: Tree) {
    return tree && this.cart().includes(tree.id);
  }

  addToCart(tree: Tree) {
    if (!this.isInCart(tree)) {
      this.cart.set([...this.cart(), tree.id]);
    }
  }

  removeFromCart(tree: Tree) {
    if (this.isInCart(tree)) {
      this.cart.set(this.cart().filter(id => id !== tree.id));
    }
  }
}
