import { Injectable, signal, effect } from '@angular/core';
import { Character } from '../interfaces/character.interface';


function loadFromLocalStorage(): Character[] {
  const characters = localStorage.getItem('characters');
  return characters ? JSON.parse(characters) : [];
}



@Injectable({ providedIn: 'root' })
export class DragonBallService {
  constructor() { }

  characters = signal<Character[]>(loadFromLocalStorage());

  saveToLocalStorage = effect(() => {
    localStorage.setItem('characters', JSON.stringify(this.characters()));
  });

  addCharacter(character: Character) {
    if (!character.name || !character.power || character.power <= 0) {
      return;
    }
    character.id = this.characters().length + 1;
    this.characters.update(current => [...current, character]);
  }

}
