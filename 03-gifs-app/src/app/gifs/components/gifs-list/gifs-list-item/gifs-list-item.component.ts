import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.component.html',
  standalone: true
})
export class GifsListItemComponent {
  imageUrl = input.required<string>();
 }
