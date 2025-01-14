import { Component, Input, OnInit } from '@angular/core';
import { Tree } from '../data.service';
import { TreebaseLinkComponent } from "../treebase-link/treebase-link.component";
import { TreebaseTableComponent } from "../treebase-table/treebase-table.component";

@Component({
  selector: 'app-treebase-info',
  imports: [TreebaseLinkComponent, TreebaseTableComponent],
  templateUrl: './treebase-info.component.html',
  styleUrl: './treebase-info.component.less'
})
export class TreebaseInfoComponent implements OnInit {
  @Input() tree: Tree;

  ngOnInit() {
    console.log('TreebaseInfoComponent initialized', this.tree);
  }
}
