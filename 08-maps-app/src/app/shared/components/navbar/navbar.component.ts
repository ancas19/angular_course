import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { filter, map } from 'rxjs';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive,AsyncPipe],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  router=inject(Router);

  routesNavbar = routes.filter(route=>route.path!=='**')
  .map(route=>({
    path:route.path,
    title:`${route.title ?? 'Maps App'}`
  }))

  pageTitle$=this.router.events.pipe(
    filter(event=>event instanceof NavigationEnd),
    map(event=>event.url),
    map(url=>this.routesNavbar.find(route=>`/${route.path}`===url)?.title ?? 'Maps App')
  )

}
