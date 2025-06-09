import { GifService } from './../../services/GifService.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Component, computed, inject } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'gif-history',
  imports: [GifsListComponent],
  templateUrl: './gif-history.component.html',
  standalone: true
})
export default class GifHistoryComponent { 
 
  gifService=inject(GifService);
  query=toSignal(inject(ActivatedRoute).params.pipe(map(params => params['query'] || '')));


  gifsByKey= computed(()=>{
    return this.gifService.getSearchHistory(this.query());
  })
  


}

