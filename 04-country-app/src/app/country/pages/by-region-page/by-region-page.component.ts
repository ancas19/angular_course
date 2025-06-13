import { Component } from '@angular/core';
import { ContrySearchInputComponent } from "../../components/contry-search-input/contry-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  standalone: true
})
export class ByRegionPageComponent { }
