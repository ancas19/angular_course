import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper{

    static mapCountries(data:RESTCountry[]):Country[]{
        return data.map(restCountry => this.mapToCountry(restCountry));
    }
    static mapToCountry(restCountry: RESTCountry): Country {
        return {
            cca2: restCountry.cca2,
            flag: restCountry.flag,
            flagSvg: restCountry.flags.svg,
            name: restCountry.translations['spa']?.official || restCountry.name.common,
            capital: restCountry.capital.join(','),
            population: restCountry.population,
            region: restCountry.region,
            subregion: restCountry.subregion
        };
    }

}