import { DragonBallService } from './../../services/dragonball.service';
import { Character } from './../../interfaces/character.interface';

import { Component, inject, signal } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";


@Component({
  selector: 'app-dragonball-super',
  templateUrl: './dragonball-super.component.html',
  imports: [CharacterListComponent, CharacterAddComponent],
})
export class DragonballSuperComponent {

  public dragonBallService = inject(DragonBallService);
  addCharacter(character: Character) {
    console.log(`Adding character: ${character.name} with power: ${character.power}`);
    this.dragonBallService.addCharacter(character);
  }

}
