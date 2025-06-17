import {  Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink, SpinnerComponent],
  templateUrl: './country-list.component.html',
  standalone: true
})
export class CountryListComponent {
  countries=input.required<Country[]>();
  errorMessage=input<string| unknown| null>();
  isLoading=input<boolean>(false);
  isEmpty=input<boolean>(false);
}
