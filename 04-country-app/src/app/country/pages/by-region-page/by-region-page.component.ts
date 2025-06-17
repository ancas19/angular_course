import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { Region } from '../../interfaces/region.type';
import { ActivatedRoute, Router } from '@angular/router';


function validateQueryparam(queryparam: string): Region {
  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic'
  }
  return validRegions[queryparam.toLowerCase()] ?? 'Americas';
}


@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent, TitleCasePipe],
  templateUrl: './by-region-page.component.html',
  standalone: true
})
export class ByRegionPageComponent {

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParams['region'] ?? '';

  selectedRegion = linkedSignal<Region | null>(() => validateQueryparam(this.queryParam));

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  constructor(
    private countryService: CountryService
  ) {

  }

  countryResources = rxResource({
    request: () => ({ query: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      this.router.navigate(['/country/by-region'], { queryParams: { region: request.query } });
      return this.countryService.searchByRegion(request.query);
    }
  })


  searchByRegion(query: Region) {
    this.selectedRegion.set(query);
  }
}
