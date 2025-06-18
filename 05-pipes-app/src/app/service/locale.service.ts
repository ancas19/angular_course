import { Injectable, signal } from '@angular/core';
export type AvailableLocale = 'es'|'fr'|'en';
@Injectable({providedIn: 'root'})
export class LocaleService {

    private currentLoclale = signal<AvailableLocale>('es');

    constructor() {
        this.currentLoclale.set(
            localStorage.getItem('locale') as AvailableLocale ?? 'es'
        )

     }


    getLocale():string{
        return this.currentLoclale();
    }

    setLocale(locale:AvailableLocale){
        localStorage.setItem('locale',locale);
        this.currentLoclale.set(locale);
        window.location.reload();
    }
    
}