import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = environment.MAPBOX_KEY;

/**
 * width: 100%;
 * height: 260px;
 *
 */
@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  lgnLat= input.required<{lng: number, lat: number}>();
  zomm = input<number>(14);
  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;
    const element = this.divElement()!.nativeElement;
    await new Promise(resolve => setTimeout(resolve, 80));
    const { lng, lat } = this.lgnLat();
    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [ lng,lat ],
      zoom: this.zomm(),
      interactive: false
    });

    new mapboxgl.Marker()
      .setLngLat( [  lng, lat ] )
      .addTo( map );
  }

}
