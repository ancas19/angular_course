import { output, signal } from '@angular/core';
import { Component } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
  standalone: true
})
export class CharacterAddComponent { 
   name =signal('');
   power= signal(0);

   newCharacter = output<Character>();

   addCharacter(){
    console.log(`Adding character: ${this.name()} with power: ${this.power()}`);
    const player: Character = {
      id: 0,
      name: this.name(),
      power: this.power(),
    };
    this.newCharacter.emit(player);
    this.resetFields();
   }

    resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
