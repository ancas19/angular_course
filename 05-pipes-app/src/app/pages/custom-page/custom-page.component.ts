import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../pipes/toggle-case.pipe';
import { heroes } from '../../data/hero.data';
import { Hero } from '../../interfaces/hero.interface';
import { CanFlyPipe } from '../../pipes/can-fly.pipe';
import { heroColorPipe } from "../../pipes/hero-color.pipe";
import { HeroTextColorPipe } from "../../pipes/hero-text-color.pipe";
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { HeroCreatorPipe } from '../../pipes/hero-creator.pipe';
import { HeroSortByPipe } from '../../pipes/hero-sort-by.pipe';
import { HeroFilterPipe } from "../../pipes/hero-filter.pipe";

@Component({
  selector: 'app-custom-page',
  imports: [ToggleCasePipe, CanFlyPipe, heroColorPipe, HeroTextColorPipe, TitleCasePipe, HeroCreatorPipe, UpperCasePipe, HeroSortByPipe, HeroFilterPipe],
  templateUrl: './custom-page.component.html',
})
export default class CustomPageComponent {
  name = signal<string>('Andrés Gómez');
  upperCase = signal<boolean>(true);
  sortBy=signal<keyof Hero| null>(null);
  heros = signal<Hero[]>(heroes);
  searchQuery=signal<string>('');

  toggleCase() {
    this.upperCase.set(!this.upperCase());
  }
}
