import { Component } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  imports: [],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent { 


  onSearchByCapital( capital: string ): void {
    console.log({capital})
  }

}
