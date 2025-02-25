import { Component } from '@angular/core';
import { StateService } from '../state.service';
import { Router, RouterModule } from '@angular/router';
import { ClickOnReturnDirective } from '../click-on-return.directive';

@Component({
  selector: 'app-cart-icon',
  imports: [
    ClickOnReturnDirective,
    RouterModule
  ],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.less'
})
export class CartIconComponent {

  constructor(public state: StateService, private router: Router) {}

  navigate() {
    this.router.navigate(['/compare'], {queryParamsHandling: 'preserve'});
  }
}
