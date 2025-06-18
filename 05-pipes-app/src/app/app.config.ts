import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import localEs from '@angular/common/locales/es-CO'
import localFr from '@angular/common/locales/fr'
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import { LocaleService } from './service/locale.service';



registerLocaleData(localEs, 'es')
registerLocaleData(localFr, 'fr')

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: LOCALE_ID,
      deps: [LocaleService],
      useFactory:(localeService:LocaleService)=>localeService.getLocale()
    }
  ]
};
