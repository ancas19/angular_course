import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';

import { GifService } from './../../services/GifService.service';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { ScrollStateService } from 'src/app/shared/service/scroll-stateservice';

@Component({
  selector: 'app-trending-page',
  imports: [GifsListComponent],
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDevRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.getScrollState();
  }

  scrollStateService = inject(ScrollStateService);
  gifService = inject(GifService)
  scrollDevRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');


  onScroll(event: Event) {
    const scrollDiv = this.scrollDevRef()?.nativeElement;
    if (!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    this.scrollStateService.setScrollState(scrollTop);
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    if (isAtBottom && !this.gifService.trendingGifsloading()) {
      this.gifService.loadTrendingGifs();
    }
  }

}
