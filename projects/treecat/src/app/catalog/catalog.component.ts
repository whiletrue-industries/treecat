import { Component } from '@angular/core';
import { StateService } from '../state.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-catalog',
  imports: [
    HeaderComponent
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.less'
})
export class CatalogComponent {

  constructor(public state: StateService) {

  }
}
