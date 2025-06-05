import { NgClass } from '@angular/common';
import { Component, signal, computed } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}


@Component({
  selector: 'app-dragonball-page',
  templateUrl: './dragonball-page.component.html',
})
export class DragonballPageComponent {

  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    {
      id: 1,
      name: 'Goku',
      power: 9000,
    }
  ]);


  addCharacter() {

    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }
    console.log(`Adding character: ${this.name()} with power: ${this.power()}`);
    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power(),
    };
    this.characters.update(current => [...current, newCharacter]);
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
