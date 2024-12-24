import { Component } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-cart-icon',
  imports: [],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.less'
})
export class CartIconComponent {

  constructor(public state: StateService) {}
}
