import { Color } from './../interfaces/hero.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'heroColor'
})

export class heroColorPipe implements PipeTransform {
    transform(value:Color):string {
        return Color[value];
    }
}