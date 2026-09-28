import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { OrganizationComponent } from './pages/organization/organization.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { LeaveComponent } from './pages/leave/leave.component';
import { ContractsComponent } from './pages/contracts/contracts.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { AuditComponent } from './pages/audit/audit.component';
import { WorkflowsComponent } from './pages/workflows/workflows.component';
import { ModuleOverviewComponent } from './pages/module-overview/module-overview.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'organization', component: OrganizationComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'leave', component: LeaveComponent },
      { path: 'contracts', component: ContractsComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: 'audit', component: AuditComponent },
      { path: 'workflows', component: WorkflowsComponent },
      { path: 'legajo', component: ModuleOverviewComponent, data: { title: 'Legajo digital', icon: '📁', description: 'Documentos, estudios, experiencia y certificados por trabajador.' } },
      { path: 'documents', component: ModuleOverviewComponent, data: { title: 'Documentos', icon: '📎', description: 'Adjuntos, tipos documentales, vigencia y trazabilidad.' } },
      { path: 'portal-employee', component: ModuleOverviewComponent, data: { title: 'Portal del empleado', icon: '👤', description: 'Perfil, asistencia, vacaciones, permisos, documentos y solicitudes.' } },
      { path: 'portal-manager', component: ModuleOverviewComponent, data: { title: 'Portal del jefe', icon: '👔', description: 'Equipo, aprobaciones, ausencias, vacaciones e incidencias.' } },
      { path: 'reports', component: ModuleOverviewComponent, data: { title: 'Reportes', icon: '📑', description: 'Personal, contratos, asistencia, vacaciones y permisos.' } }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
