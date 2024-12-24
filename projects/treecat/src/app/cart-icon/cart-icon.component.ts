import { Component } from '@angular/core';
import { StateService } from '../state.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-icon',
  imports: [
    RouterModule
  ],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.less'
})
export class CartIconComponent {

  constructor(public state: StateService) {}
}
