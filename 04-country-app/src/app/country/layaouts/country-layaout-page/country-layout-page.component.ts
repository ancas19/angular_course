import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";

@Component({
  selector: 'country-layaout-page',
  imports: [RouterOutlet, TopMenuComponent],
  templateUrl: './country-layout-page.component.html',
  standalone: true
})
export class CountryLayoutPageComponent { }
