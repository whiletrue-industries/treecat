import { Injectable } from '@angular/core';
import { ClimateArea, DataService, SidewalkWidth, Tree } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  selectedTreeId: string | null = null;
  trees: Tree[] = [];

  selectedSidewalkWidth: SidewalkWidth | null = null;
  selectedClimateArea: ClimateArea | null = null;

  constructor(private data: DataService) {
    data.trees.subscribe(trees => {
      this.trees = trees;
    });
  }
}
