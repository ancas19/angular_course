import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'contry-search-input',
  imports: [],
  templateUrl: './contry-search-input.component.html',
  standalone: true
})
export class ContrySearchInputComponent {

  value = output<string>();
  inputValue = signal<string>('');
  placeholder = input<string>('Search');
  debounceTime = input<number>(500);


  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    })
  })

  onSearch(query: string) {
    this.value.emit(query);
  }

}
