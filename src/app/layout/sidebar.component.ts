import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { AuthSessionService } from '../core/auth-session.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">TS</div>
        <div>
          <strong>Torresoft People</strong>
          <small>Recursos Humanos V1</small>
        </div>
      </div>

      <nav>
        <a routerLink="/dashboard" routerLinkActive="active">📊 Dashboard</a>
        <div class="nav-label">Configuración</div>
        <a routerLink="/configuration" routerLinkActive="active">⚙️ Administración</a>
        <a routerLink="/organization" routerLinkActive="active">🏢 Organización</a>
        <a routerLink="/audit" routerLinkActive="active">🧾 Auditoría</a>

        <div class="nav-label">Gestión de personal</div>
        <a routerLink="/employees" routerLinkActive="active">👥 Personal</a>
        <a routerLink="/legajo" routerLinkActive="active">📁 Legajo digital</a>
        <a routerLink="/contracts" routerLinkActive="active">📄 Contratos</a>
        <a routerLink="/documents" routerLinkActive="active">📎 Documentos</a>

        <div class="nav-label">Tiempo y ausencias</div>
        <a routerLink="/attendance" routerLinkActive="active">🕒 Asistencia</a>
        <a routerLink="/leave" routerLinkActive="active">🏖️ Vacaciones y permisos</a>

        <div class="nav-label">Procesos</div>
        <a routerLink="/workflows" routerLinkActive="active">🔄 Workflow</a>
        <a routerLink="/portal-employee" routerLinkActive="active">👤 Portal empleado</a>
        <a routerLink="/portal-manager" routerLinkActive="active">👔 Portal jefe</a>
        <a routerLink="/reports" routerLinkActive="active">📑 Reportes</a>
      </nav>

      <div class="sidebar-user" *ngIf="session.user$ | async as user">
        <strong>{{ user.fullName }}</strong>
        <small>{{ user.role }} · {{ user.username }}</small>
        <button class="logout-button" type="button" (click)="auth.logout()">↪ Cerrar sesión</button>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  constructor(
    public readonly session: AuthSessionService,
    public readonly auth: AuthService
  ) {}
}
