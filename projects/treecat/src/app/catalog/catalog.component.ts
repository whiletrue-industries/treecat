import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { HeaderComponent } from '../header/header.component';
import { DataService, Tree } from '../data.service';
import { CommonModule } from '@angular/common';
import { CardGridComponent } from "../card-grid/card-grid.component";
import { TreeInfoComponent } from '../tree-info/tree-info.component';
import { Router } from '@angular/router';
import { ClickOnReturnDirective } from '../click-on-return.directive';
import { CartIconComponent } from "../cart-icon/cart-icon.component";

@Component({
  selector: 'app-catalog',
  imports: [
    CommonModule,
    HeaderComponent,
    CardGridComponent,
    TreeInfoComponent,
    ClickOnReturnDirective,
    CartIconComponent
],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.less'
})
export class CatalogComponent implements OnInit {

  constructor(public state: StateService, public data: DataService, private router: Router) {
  }

  ngOnInit() {
    this.data.fetchTrees();
  }

  open(tree: Tree) {
    // this.state.selectedTree.set(tree);
    this.router.navigate(['/tree', tree.id], { queryParamsHandling: 'preserve'});
  }
}
