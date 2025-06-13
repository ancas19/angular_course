import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ContrySearchInputComponent } from "../../components/contry-search-input/contry-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';

@Component({
  selector: 'by-country',
  imports: [ContrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  standalone: true
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);

  query = signal<string>('');
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      return this.countryService.searchByCountry(request.query);
    }
  })


}
