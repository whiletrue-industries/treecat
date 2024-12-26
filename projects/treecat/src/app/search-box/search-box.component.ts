import { Component } from '@angular/core';
import { StateService } from '../state.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  imports: [
    FormsModule
  ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.less'
})
export class SearchBoxComponent {

  constructor(public state: StateService) {}
}
