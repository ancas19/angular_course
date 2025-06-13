import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-country-page',
  imports: [ErrorComponent, SpinnerComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
  countryCode=inject(ActivatedRoute).snapshot.params['code'];
  countryService=inject(CountryService);

  countryResource=rxResource({
    request:()=>({code:this.countryCode}),
    loader:({request})=>{
      return this.countryService.searchCountryByAlphaCode(request.code);
    }
  });  


}
