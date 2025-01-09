import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Tree } from '../data.service';
import { TreeInfoComponent } from '../tree-info/tree-info.component';
import { TreeGalleryComponent } from '../tree-gallery/tree-gallery.component';
import { TreebaseInfoComponent } from '../treebase-info/treebase-info.component';
import { SimilarTreesComponent } from '../similar-trees/similar-trees.component';
import { ClickOnReturnDirective } from '../click-on-return.directive';
import domtoimage from 'dom-to-image';
import { StateService } from '../state.service';
import { CartIconComponent } from "../cart-icon/cart-icon.component";
import { LightboxComponent } from '../lightbox/lightbox.component';

@Component({
  selector: 'app-tree',
  imports: [
    HeaderComponent,
    TreeInfoComponent,
    TreeGalleryComponent,
    TreebaseInfoComponent,
    SimilarTreesComponent,
    ClickOnReturnDirective,
    CartIconComponent,
    LightboxComponent
],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.less'
})
export class TreeComponent implements OnInit {

  tree: Tree;
  openLightbox: number | null = null;

  @ViewChild('mainInfo') mainInfoEl: ElementRef;

  constructor(private route: ActivatedRoute, private data: DataService, public state: StateService, private router: Router) {
    this.route.params.subscribe(params => {
      this.data.fetchTree(params['id']).subscribe(tree => {
        if (tree) {
          this.tree = tree;
          this.state.setPageTitle(this.tree ? `${this.tree.name} (${this.tree.botanicalName})` : null);
        }
      });
    });
  }

  ngOnInit() {
    this.data.fetchTrees();
  }

  saveAsImg() {
    if (!this.mainInfoEl.nativeElement) {
      return;
    }
    domtoimage.toPng(this.mainInfoEl.nativeElement)
      .then((dataUrl) => {
          var link = document.createElement('a');
          link.download = this.tree.id + '.png';
          link.href = dataUrl;
          link.click();
    });
  }

  close(contract: boolean) {
    console.log('Close tree', contract);
    if (contract) {
      this.state.selectedTree.set(this.tree);
    } else {
      this.state.selectedTree.set(null);
    }
    this.router.navigate(['/catalog'], { queryParamsHandling: 'preserve'});
  }


}
