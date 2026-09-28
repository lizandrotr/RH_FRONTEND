import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { AuthSessionService } from '../../core/auth-session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="login-page">
      <div class="login-hero">
        <div class="brand-mark">TS</div>
        <span class="eyebrow" style="color:#93c5fd">TORRESOFT PEOPLE</span>
        <h1>Gestiona personas con más orden y trazabilidad.</h1>
        <p>Una plataforma de Recursos Humanos pensada para empresas privadas y entidades públicas.</p>
        <div class="login-feature-list">
          <div class="login-feature">✓ Personal, legajo y contratos centralizados</div>
          <div class="login-feature">✓ Asistencia, vacaciones, permisos y licencias</div>
          <div class="login-feature">✓ Workflows, auditoría y reportes</div>
        </div>
      </div>

      <div class="login-panel-wrap">
        <div class="login-card">
          <span class="eyebrow">Acceso seguro</span>
          <h2>Iniciar sesión</h2>
          <p>Ingresa tus credenciales para acceder a Torresoft People.</p>

          <form class="login-form" (ngSubmit)="submit()">
            <label>
              Usuario
              <input
                name="username"
                autocomplete="username"
                [(ngModel)]="username"
                [disabled]="loading"
                required
                autofocus>
            </label>

            <label class="password-field">
              Contraseña
              <input
                [type]="showPassword ? 'text' : 'password'"
                name="password"
                autocomplete="current-password"
                [(ngModel)]="password"
                [disabled]="loading"
                required>
              <button class="password-toggle" type="button" (click)="showPassword = !showPassword">
                {{ showPassword ? 'Ocultar' : 'Mostrar' }}
              </button>
            </label>

            <div class="login-error" *ngIf="errorMessage">{{ errorMessage }}</div>
            <div class="login-error" *ngIf="sessionExpired">Tu sesión expiró. Inicia sesión nuevamente.</div>

            <button class="primary" type="submit" [disabled]="loading || !username || !password">
              {{ loading ? 'Ingresando...' : 'Ingresar' }}
            </button>
          </form>

          <div class="login-demo">
            <strong>Usuario de desarrollo</strong><br>
            Usuario: admin<br>
            Contraseña: Admin123!
          </div>

          <div class="login-footer">Torresoft People · Recursos Humanos V1</div>
        </div>
      </div>
    </section>
  `
})
export class LoginComponent implements OnInit {
  username = 'admin';
  password = 'Admin123!';
  showPassword = false;
  loading = false;
  errorMessage = '';
  sessionExpired = false;

  constructor(
    private readonly auth: AuthService,
    private readonly session: AuthSessionService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sessionExpired = this.route.snapshot.queryParamMap.get('sessionExpired') === 'true';
    if (this.session.isAuthenticated) {
      void this.router.navigate(['/dashboard']);
    }
  }

  submit(): void {
    if (!this.username.trim() || !this.password) return;

    this.loading = true;
    this.errorMessage = '';
    this.sessionExpired = false;

    this.auth.login(this.username.trim(), this.password)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
          void this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.errorMessage = error.status === 401
            ? 'Usuario o contraseña incorrectos.'
            : 'No se pudo conectar con el servidor. Verifica que RH_BACKEND esté ejecutándose.';
        }
      });
  }
}
