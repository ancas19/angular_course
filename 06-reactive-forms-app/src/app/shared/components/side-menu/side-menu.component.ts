import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { title } from 'process';

interface MenuItem {
  title: string;
  route: string;
}


const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html'
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactiveItems
  .filter(menuItem => menuItem.path!=='**')
  .map(menuItem => ({
    title:`${menuItem.title}`,
    route: `reactive/${menuItem.path}`
  }));

  authMenu:MenuItem[]=[
    {
      title: 'Sign up',
      route: './auth'
    }
  ]

  countryMenu:MenuItem[]=[
    {
      title: 'Country',
      route: './country'
    }
  ]
}
