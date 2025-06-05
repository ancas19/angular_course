import { Character } from './../../interfaces/character.interface';

import { Component, signal } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";


@Component({
  selector: 'app-dragonball-super',
  templateUrl: './dragonball-super.component.html',
  imports: [CharacterListComponent, CharacterAddComponent],
})
export class DragonballSuperComponent {

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
    }
  ]);

  addCharacter(character: Character) {
    if (!character.name || !character.power || character.power <= 0) {
      return;
    }
    character.id = this.characters().length + 1;
    this.characters.update(current => [...current, character]);
  }


}
