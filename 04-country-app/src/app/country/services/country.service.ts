import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mapper/country.mapper';
import { Country } from '../interfaces/country.interface';


const API_URL = 'https://restcountries.com/v3.1';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private queryCacheCapital:Map<string,Country[]>=new Map();
  private queryCacheCountry:Map<string,Country[]>=new Map();
  private queryCacheRegion:Map<string,Country[]>=new Map();
  constructor(
    private http:HttpClient
  ) { }


  searchByCapital(query:string):Observable<Country[]>{
    query=query.toLocaleLowerCase();
    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query)!);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map(data=>CountryMapper.mapCountries(data)),
      tap(countries=>this.queryCacheCapital.set(query,countries)),
      delay(2000),
      catchError(error=>{
        return throwError(()=>new Error(`Countries not found for ${query}`));
      })
    );
  }


  searchByCountry(query:string):Observable<Country[]>{
    query=query.toLocaleLowerCase();
    if(this.queryCacheCountry.has(query)){
      return of(this.queryCacheCountry.get(query)!);
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map(data=>CountryMapper.mapCountries(data)),
      tap(countries=>this.queryCacheCountry.set(query,countries)),
      delay(2000),
      catchError(error=>{
        return throwError(()=>new Error(`Countries not found for ${query}`));
      })
    );
  }



    searchCountryByAlphaCode(code:string):Observable<Country>{
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map(data=>CountryMapper.mapCountries(data)),
      delay(5000),
      map(countries=>countries[0]),
      catchError(error=>{
        return throwError(()=>new Error(`Country not found for ${code}`));
      })
    );
    }
 
  searchByRegion(query:string):Observable<Country[]>{
     if(this.queryCacheRegion.has(query)){
      return of(this.queryCacheRegion.get(query)!);
     } 
     const url = `${API_URL}/region/${query}`;
     return this.http.get<RESTCountry[]>(url)
     .pipe(
       map(data=>CountryMapper.mapCountries(data)),
       tap(countries=>this.queryCacheRegion.set(query,countries)),
       delay(2000),
       catchError(error=>{
         return throwError(()=>new Error(`Countries not found for ${query}`));
       })
     );
  }
}
