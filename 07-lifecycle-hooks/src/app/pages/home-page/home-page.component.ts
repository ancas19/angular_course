import { afterNextRender, afterRender, Component, effect, OnInit, signal } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';

const log=(...messages:string [])=>{
  console.log(`${ messages[0]} %c${messages.slice(1).join(', ')}`,'color:#bada55');
}
@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit{

  traditionalProperty='Andres';
  signalProperty=signal('Andres');

  constructor() {
   log('constructor','Constuctor llamado')
  }

  changeTraditional(){
    this.traditionalProperty='Andres 2';
  }

  changeSignal(){
    this.signalProperty.set('Andres 2');
  }
  
  basicEffect= effect((onCleanup)=>{
    console.log('basicEffect','Disparar efectos secundarios');

    onCleanup(()=>{
      console.log('basicEffect','Limpiar efectos secundarios');
    })
  });
  ngOnInit() {
    log('ngOnInit',"Run once after Angular has initialized all the component's inputs.")
  }
  ngOnChanges() {
    log('ngOnChanges',"Run every time the component's inputs  have changed")
  }
  ngDoCheck() {
    log('ngDoCheck',"	Runs every time this component is checked for changes.")
  }
  ngAfterContentInit() {
    log('ngAfterContentInit',"	Runs after the content of the component has been initialized.")
  }
  ngAfterContentChecked() {
    log('ngAfterContentChecked',"	Runs every time this component content has been checked for changes.")
  }
  ngAfterViewInit() {
    log('ngAfterViewInit',"Runs once after the component's view has been initialized")
  }
  ngAfterViewChecked() {
    log('ngAfterViewChecked',"	Runs every time the component's view has been checked for changes.")
  }
  ngOnDestroy() {
    log('ngOnDestroy',"	Runs once just before Angular destroys the component.")
  }

  afterNextRenderEffect= afterNextRender(()=>{
    log('afterNextRender',"Runs once the next time that all components have been rendered to the DOM")
  });

  afterRenderEffect= afterRender(()=>{
    log('afterRender',"Runs every time that all components have been rendered to the DOM")
  });
}
