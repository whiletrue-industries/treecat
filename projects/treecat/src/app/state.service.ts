import { computed, Injectable, signal } from '@angular/core';
import { ClimateArea, DataService, SidewalkWidth, Tree } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  selectedTreeId = signal<string | null>(null);
  trees = signal<Tree[]>([]);

  selectedSidewalkWidth: SidewalkWidth | null = null;
  selectedClimateArea: ClimateArea | null = null;

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
}
