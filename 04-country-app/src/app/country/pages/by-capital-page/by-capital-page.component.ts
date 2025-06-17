import { Component, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ContrySearchInputComponent } from "../../components/contry-search-input/contry-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-by-capital-page',
  imports: [ContrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  router=inject(Router);
  activatedRoute = inject(ActivatedRoute);

  queryParam = this.activatedRoute.snapshot.queryParams['query'] ?? '';
  query = linkedSignal<string>(() => this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      this.router.navigate(['/country/by-capital'], { queryParams: { query: request.query } });
      return this.countryService.searchByCapital(request.query);
    }
  })


  /*countryResource= resource({
    request:()=>({query:this.query()}),
    loader:async({ request})=>{
      if(!request.query) return [];
      return await firstValueFrom( this.countryService.searchByCapital(request.query));
    }
  })
*/
  /*isLoading = signal<boolean>(false);
  isError = signal<string|null>(null);
  countries = signal<Country[]>([]);

  onSearch(query:string){
    if(this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);
    this.countryService.searchByCapital(query)
    .subscribe({
      next:(countries)=>{
        this.countries.set(countries);
        this.isLoading.set(false);
      },
      error:(error)=>{
        this.isLoading.set(false);
        this.countries.set([]);
        this.isError.set(error.message);
      }
    }
    );
  }*/
}
