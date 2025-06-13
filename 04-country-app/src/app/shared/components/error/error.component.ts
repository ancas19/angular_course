import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'not-found-error',
  imports: [],
  templateUrl: './error.component.html',
  standalone: true
})
export class ErrorComponent {
  location=inject(Location);

  goBack(){
    this.location.back();
  }
}
