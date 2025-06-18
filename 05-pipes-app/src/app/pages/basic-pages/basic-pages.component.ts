import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { AvailableLocale, LocaleService } from '../../service/locale.service';

@Component({
  selector: 'app-basic-pages',
  imports: [LowerCasePipe,UpperCasePipe,TitleCasePipe,DatePipe],
  templateUrl: './basic-pages.component.html',
  standalone: true
})
export default class BasicPagesComponent { 

  localeService=inject(LocaleService);
  currentLocale= signal(inject(LOCALE_ID));

  nameLower= signal('andrés');
  nameUpper= signal('ANDRÉS');
  fullName= signal('aNdRés GóMez');

  customDate= signal(new Date());

  tickingDateEffect= effect((onCleanup)=>{
    const interval=setInterval(()=>{
      this.customDate.set(new Date());
    },1000);

    onCleanup(()=>{
      clearInterval(interval);
    })
  });


  changeLoclae(locale:AvailableLocale){
    this.localeService.setLocale(locale);
  }
}
