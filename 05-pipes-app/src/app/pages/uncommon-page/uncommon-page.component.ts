import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Fernando',
  age: 36,
  gender: 'male',
  address: 'Colombia'
}



const client2 = {
  name: 'Fernanda',
  age: 36,
  gender: 'female',
  address: 'Brasil'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe,JsonPipe,UpperCasePipe,KeyValuePipe,AsyncPipe],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {

  //i18n select 
  client = signal(client1);
  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }


  changeClinet() {
    if (this.client() === client1) {
      this.client.set(client2);
      return;
    }
    this.client.set(client1);

  }


  //i18plural pipe
  clients = signal<string[]>([
    'Maria',
    'Pedro',
    'Fernando',
    'Eduardo',
    'Fernanda',
    'Melissa',
    'Guadalupe',
    'Fernando',
    'Fernando',
    'Fernando'
  ])

  clientsMap = {
    '=0': 'no tenemos ningun cliente esperando',
    '=1': 'tenemos un cliente esperando',
    'other': 'tenemos # clientes esperando'
  }


  removeClient() {
    this.clients.update(clients => clients.slice(1));
  }

  //keyvalue pipe
  profile = {
    name: 'Fernando',
    age: 36,
    address: 'Colombia'
  }

  //Async pipe
  promiseValue:Promise<string>=new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve('Tenemos data en la promesa');
      //reject('Tenemos un error en la promesa');
    }, 3500);
  })



  myObservableTime=interval(2000).pipe(
    map(value => value+1),
    tap(value => console.log('tap:',value))
  );
}
