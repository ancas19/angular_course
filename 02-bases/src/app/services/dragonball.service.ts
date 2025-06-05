import { Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Injectable({providedIn: 'root'})
export class DragonBallService {
    constructor() { }

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

  returnCharacters() {  
    return this.characters;
  }
}