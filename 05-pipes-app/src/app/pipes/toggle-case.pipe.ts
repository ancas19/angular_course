import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toggleCase'
})

export class ToggleCasePipe implements PipeTransform {
    transform(value: string,upper:boolean): string {
        return upper?value.toLocaleUpperCase():value.toLocaleLowerCase();
    }
}