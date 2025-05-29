import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
    standalone: true,
    templateUrl:'./counter-page.component.html',
    styles: `
        button{
            padding: 5px;
            margin: 5px 10px;
            width: 75px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterPageComponent {
    counter: number = 10;
    counterSignal= signal(10);


    constructor(){
      /*  setInterval(()=>{
           // this.counter+=1;
           this.counterSignal.update(current => current + 1); 
           console.log('Tick')
        },2000);*/
    }

    increaseByOne(value: number) {
        this.counter += value;
        //this.counterSignal.set(this.counterSignal() + value);
        this.counterSignal.update(current => current + value);
    }

    resetCounter() {
        this.counter = 0;
        this.counterSignal.set(0);
    }
}