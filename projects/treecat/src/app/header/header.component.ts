import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {

  environment = environment;
  FORM = environment.form;

}
