import { Component, input, output } from '@angular/core';

@Component({
  selector: 'contry-search-input',
  imports: [],
  templateUrl: './contry-search-input.component.html',
  standalone: true
})
export class ContrySearchInputComponent {

  value = output<string>();
  placeholder=input<string>('Search');

  onSearch(query:string){
    this.value.emit(query);
  }

}
