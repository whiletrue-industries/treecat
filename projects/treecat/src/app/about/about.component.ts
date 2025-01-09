import { Component } from '@angular/core';
import { TextPageComponent } from "../text-page/text-page.component";
import { environment } from '../../environments/environment';
import { ABOUT_RESOURCES } from '../filters/list_consts';

@Component({
  selector: 'app-about',
  imports: [TextPageComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.less'
})
export class AboutComponent {
  environment = environment;

  ABOUT_RESOURCES = ABOUT_RESOURCES;
}
