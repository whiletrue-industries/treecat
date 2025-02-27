import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router, RouterModule } from '@angular/router';
import { ClickOnReturnDirective } from '../click-on-return.directive';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cart-icon',
  imports: [
    ClickOnReturnDirective,
    RouterModule
  ],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.less'
})
export class CartIconComponent implements OnInit {

  environment = environment;

  constructor(public state: StateService, private router: Router) {}

  ngOnInit() {
    this.state.showCartIconGuide -= 1;
  }

  navigate() {
    this.router.navigate(['/compare'], {queryParamsHandling: 'preserve'});
  }
}
