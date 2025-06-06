import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SideMenuHeaderComponent } from './side-menu-header/side-menu-header.component';
import { SideMenuOptionComponent } from "./side-menu-options/side-menu-option.component";

@Component({
  selector: 'gifs-side-menu',
  imports: [SideMenuHeaderComponent, SideMenuOptionComponent],
  templateUrl: './side-menu.component.html',
  standalone: true
})
export class SideMenuComponent { }
