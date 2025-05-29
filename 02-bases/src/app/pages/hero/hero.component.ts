import { UpperCasePipe } from "@angular/common";
import { Component, signal, computed } from "@angular/core";

@Component({
    templateUrl: './hero.component.html',
    imports:[UpperCasePipe],
    styles: `
     *{
        padding: .5%;
     }
    `
})
export class HeroComponent {
    name = signal('Ironman');
    age = signal(45);

    heroDescription = computed(()=>{
        const description = `${this.name()}  -- ${this.age()}`;
        return description.toUpperCase();
    })

    capitalizedName= computed(() => {
        return this.name().toUpperCase(); 
    });



    changeHero() {
        this.name.set('Spiderman');
        this.age.set(25);
    }

    resetForm() {
        this.name.set('Ironman');
        this.age.set(45);
    }

    changeAge() {
        this.age.set(60);
    }



}