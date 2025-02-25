import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { StateService } from '../state.service';
import { ClickOnReturnDirective } from '../click-on-return.directive';

@Component({
  selector: 'app-text-page',
  imports: [
    RouterModule,
    HeaderComponent,
    ClickOnReturnDirective
  ],
  templateUrl: './text-page.component.html',
  styleUrl: './text-page.component.less'
})
export class TextPageComponent implements OnInit{
  @Input() title: string;
  @Input() share = true;

  constructor(private state: StateService) {}

  ngOnInit(): void {
      // Set page title to the title of the page, change the title element in the head of the document
      this.state.setPageTitle(this.title);
  }
}
