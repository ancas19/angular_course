import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollStateService {
   
    private trendingScrollState=signal<number>(0);
  
    
    setScrollState(state: number) {
        this.trendingScrollState.set(state);
    }


    getScrollState(): number {
        return this.trendingScrollState();
    }
}