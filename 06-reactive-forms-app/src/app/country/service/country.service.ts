import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../interface/country.interface';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {

    private http = inject(HttpClient);
    private baseUrl = 'https://restcountries.com/v3.1';

    private _regions = [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania'

    ];

    get regions(): string[] {
        return [...this._regions];
    }


    getCountriesByRegion(region: string): Observable<Country[]> {
        if (!region) of([]);
        const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
        return this.http.get<Country[]>(url);
    }

    getCountryByAlphaCode(alphaCode: string): Observable<Country> {
        const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
        return this.http.get<Country>(url);
    }

    getCountryBordersByCodes(borders: string[]): Observable<Country[]> {
        if (!borders || borders.length === 0) of([]);
        const countriesRequests: Observable<Country>[] = [];
        borders.forEach(code => {
            const request = this.getCountryByAlphaCode(code);
            countriesRequests.push(request);
        });
        return combineLatest(countriesRequests);
    }
}