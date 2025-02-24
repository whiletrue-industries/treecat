import { Component } from '@angular/core';
import { TextPageComponent } from "../text-page/text-page.component";
import { environment } from '../../environments/environment';
import { ABOUT_RESOURCES } from '../filters/list_consts';

@Component({
  selector: 'app-a11ypolicy',
  imports: [TextPageComponent],
  templateUrl: './a11ypolicy.component.html',
  styleUrl: './a11ypolicy.component.less'
})
export class A11yPolicyComponent {
  environment = environment;
}
