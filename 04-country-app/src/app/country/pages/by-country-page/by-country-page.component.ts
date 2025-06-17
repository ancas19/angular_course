import { Component, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ContrySearchInputComponent } from "../../components/contry-search-input/contry-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-country',
  imports: [ContrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  standalone: true
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParams['query'] ?? '';
  query = linkedSignal<string>(()=>this.queryParam);
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      this.router.navigate(['/country/by-country'], { queryParams: { query: request.query } });
      return this.countryService.searchByCountry(request.query);
    }
  })


}
