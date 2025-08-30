import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '@shared/side-menu/side-menu.component';


@Component({
  selector: 'app-dashboard',
  imports: [RouterModule,SideMenuComponent],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent { }
