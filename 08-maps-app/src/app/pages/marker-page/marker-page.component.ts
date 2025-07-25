import {v4 as uuidv4 } from 'uuid';
import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment.development';
import { from } from 'rxjs';
import { DecimalPipe, JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.MAPBOX_KEY;


interface Marker {
  id:string;
  mapboxMarker:mapboxgl.Marker
}
@Component({
  selector: 'app-marker-page',
  imports: [DecimalPipe],
  templateUrl: './marker-page.component.html',
})
export class MarkerPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers=signal<Marker[]>([]);



  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) {
      return;
    }
    const element = this.divElement()?.nativeElement;
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    /* const marker = new mapboxgl.Marker({
       draggable: false,
       color: 'red'
     }
     )
       .setLngLat([-74.5, 40])
       .addTo(map);*/

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {

    map.on('click', (event) => this.mapClick(event));
    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent) {
    const { lng, lat } = event.lngLat;
    const marker = new mapboxgl.Marker({
      draggable: false,
      color: '#xxxxxx'.replace(/x/g, (y) =>
        ((Math.random() * 16) | 0).toString(16)
      )
    }
    )
      .setLngLat([lng, lat])
      .addTo(this.map()!);
      const newMarker:Marker={
        id:uuidv4(),
        mapboxMarker:marker
      }
    this.markers.update(markers=>[newMarker,...markers]);
  }


  flyToMarker(lngLat: mapboxgl.LngLatLike) {
    if(!this.map()) return;
    this.map()?.flyTo({
      center: lngLat,
      zoom: 14,
    });

  }

  deleteMarker(marker:Marker){
    if(!this.map()) return;
    const map=this.map()!;
    marker.mapboxMarker.remove();
    this.markers.update(markers=>markers.filter(m=>m.id!==marker.id));

  }

}
