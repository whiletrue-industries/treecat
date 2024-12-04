import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute } from '@angular/router';
import { DataService, Tree } from '../data.service';
import { TreeInfoComponent } from '../tree-info/tree-info.component';
import { TreeGalleryComponent } from '../tree-gallery/tree-gallery.component';
import { TreebaseInfoComponent } from '../treebase-info/treebase-info.component';
import { SimilarTreesComponent } from '../similar-trees/similar-trees.component';

@Component({
  selector: 'app-tree',
  imports: [
    HeaderComponent,
    TreeInfoComponent,
    TreeGalleryComponent,
    TreebaseInfoComponent,
    SimilarTreesComponent
  ],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.less'
})
export class TreeComponent implements OnInit {

  tree: Tree;

  constructor(private route: ActivatedRoute, private data: DataService) {
    this.route.params.subscribe(params => {
      this.data.fetchTree(params['id']).subscribe(tree => {
        if (tree) {
          this.tree = tree;
        }
      });
    });
  }

  ngOnInit() {
    this.data.fetchTrees();
  }



}
