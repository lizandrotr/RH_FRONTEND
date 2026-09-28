import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthSessionService } from './core/auth-session.service';
import { SidebarComponent } from './layout/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  template: `
    <ng-container *ngIf="session.user$ | async; else publicLayout">
      <div class="app-shell">
        <app-sidebar></app-sidebar>
        <main class="app-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </ng-container>

    <ng-template #publicLayout>
      <router-outlet></router-outlet>
    </ng-template>
  `
})
export class AppComponent {
  constructor(public readonly session: AuthSessionService) {}
}
