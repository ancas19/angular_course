import { Component, inject, signal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifService } from '../../services/GifService.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html'
})
export default class SearchPageComponent {

  gifService = inject(GifService);
  gifsFound=signal<Gif[]>([]);
  onSearch(query:string){
    this.gifService.searchGifs(query)
      .subscribe((resp)=>{
          this.gifsFound.set(resp);
      });
  }
}
