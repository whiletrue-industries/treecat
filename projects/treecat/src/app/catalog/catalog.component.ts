import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { HeaderComponent } from '../header/header.component';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { CardGridComponent } from "../card-grid/card-grid.component";

@Component({
  selector: 'app-catalog',
  imports: [
    CommonModule,
    HeaderComponent,
    CardGridComponent
],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.less'
})
export class CatalogComponent implements OnInit {

  constructor(public state: StateService, public data: DataService) {
  }

  ngOnInit() {
    this.data.fetchTrees();
  }
}
