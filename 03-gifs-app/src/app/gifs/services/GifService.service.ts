import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

import { map, Observable, of, tap } from 'rxjs';

import { Gif } from './../interfaces/gif.interface';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.intefaces';
import { GifMapper } from '../mapper/gif.mapper';


const GIFS_KEY = 'gifsSearchHistory';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIFS_KEY) || '[]';
  return JSON.parse(gifsFromLocalStorage);
}


@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsloading = signal<boolean>(false);
 private trendingPage = signal<number>(0);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()));

  trendingGifGroups = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    return groups;
  });

  constructor() {
    this.loadTrendingGifs();
  }


  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIFS_KEY, historyString);
  });


  loadTrendingGifs() {
    if (this.trendingGifsloading()) return;
    this.trendingGifsloading.set(true);
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() * 20 // 20 gifs per page
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);
      this.trendingGifsloading.set(false);
      this.trendingPage.update(currentValue => currentValue + 1);
    });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: 20,
      }
    })
      .pipe(
        map(({ data }) => GifMapper.mapGiphyItemsToGifArray(data)),
        tap(gifs => {
          this.searchHistory.update(history => ({ ...history, [query.toLowerCase()]: gifs }));
        })
      );
  }


  getSearchHistory(query: string): Gif[] {
    return this.searchHistory()[query.toLowerCase()] || [];
  }

}
