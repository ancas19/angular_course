import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/GifService.service';


interface MenuOption{
  icon:string;
  label:string;
  router:string;
  subLabel:string;
}
@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './side-menu-option.component.html',
  standalone: true
})
export class SideMenuOptionComponent {

  gifService=inject(GifService);

  options: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      router: '/dashboard/trending',
      subLabel: 'Popular GIFs right now'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      router: '/dashboard/search',
      subLabel: 'Search for GIFs'
    }
  ];
}
