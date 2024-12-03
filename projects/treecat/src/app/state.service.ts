import { Injectable } from '@angular/core';
import { DataService, Tree } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  selectedTreeId: string | null = null;
  trees: Tree[] = [];

  constructor(private data: DataService) {
    data.trees.subscribe(trees => {
      this.trees = trees;
    });
  }
}
