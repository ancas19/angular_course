import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-admin-dashboard-layaout',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './admin-dashboard-layaout.component.html',
})
export class AdminDashboardLayaoutComponent {
  authService = inject(AuthService);
  user = computed(() => this.authService.user());
}
