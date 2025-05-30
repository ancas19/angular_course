import { NgClass } from '@angular/common';
import { Component, signal, computed } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}


@Component({
  selector: 'app-dragonball-page',
  imports: [NgClass],
  templateUrl: './dragonball-page.component.html',
})
export class DragonballPageComponent {

  characters = signal<Character[]>([
    {
      id: 1,
      name: 'Goku',
      power: 9000,
    },
    {
      id: 2,
      name: 'Vegeta',
      power: 8500,
    },
    {
      id: 3,
      name: 'Piccolo',
      power: 7000,
    },
    {
      id: 4,
      name: 'Yamcha',
      power: 500,
    },
  ]);

}
