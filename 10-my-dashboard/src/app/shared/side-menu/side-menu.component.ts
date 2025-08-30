import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  public menuItmes= routes
      .map(route => route.children ?? [])
      .flat()
      .filter(route => route && route.path)
      .filter(route => !route.path?.includes(':'));
}
