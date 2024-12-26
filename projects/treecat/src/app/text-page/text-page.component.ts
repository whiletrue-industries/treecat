import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-text-page',
  imports: [
    RouterModule,
    HeaderComponent
  ],
  templateUrl: './text-page.component.html',
  styleUrl: './text-page.component.less'
})
export class TextPageComponent {
  @Input() title: string;
}
