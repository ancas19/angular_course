import { GifService } from './../../services/GifService.service';
import {  Component, computed, inject } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";

@Component({
  selector: 'app-trending-page',
  imports: [GifsListComponent],
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent {
  
  gifService = inject(GifService)
 }
