import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-numbers-page',
  imports: [DecimalPipe,PercentPipe,CurrencyPipe],
  templateUrl: './numbers-page.component.html',
})
export default class NumbersPageComponent { 
  totalSells=signal<number>(5_454_555_885.3698);
  percent=signal<number>(.4856);
}
