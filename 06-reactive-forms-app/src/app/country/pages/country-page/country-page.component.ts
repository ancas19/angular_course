import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../service/country.service';
import { Country } from '../../interface/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
  private fb = inject(FormBuilder);
  private countryService = inject(CountryService);

  regions = signal(this.countryService.regions);
  countriesByRegion = signal<Country[]>([]);
  border = signal<Country[]>([]);


  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  })

  onFormChanged = effect((onCleanup) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();
    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    })
  });


  onRegionChanged() {
    return this.myForm.get('region')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.countriesByRegion.set([]);
          this.border.set([]);
        }),
        switchMap((region) => this.countryService.getCountriesByRegion(region ?? ''))
      )
      .subscribe((countries) => {
        this.countriesByRegion.set(countries);
      });
  }

  onCountryChanged() {
    return this.myForm.get('country')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter(value=>value!.length>0),
        switchMap((alphaCode) => this.countryService.getCountryByAlphaCode(alphaCode ?? '')),
        switchMap((country) => this.countryService.getCountryBordersByCodes(country.borders ?? []))
      )
      .subscribe((borderCountries) => {
        this.border.set(borderCountries);
      });
  }

}
