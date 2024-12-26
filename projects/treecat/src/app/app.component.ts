import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { distinct, distinctUntilChanged, filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {

  // Use the router to detect path changes and force scroll to top. Only path changes will trigger a scroll to top, while anchor links will not not query params.
  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => (event as NavigationEnd).url.split('?')[0]),
      distinctUntilChanged()
    ).subscribe((path) => {
        console.log('Scrolling to top', path);
        window.scrollTo(0, 0);
    });
  }
}
