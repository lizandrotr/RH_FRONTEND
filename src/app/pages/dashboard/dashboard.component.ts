import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api.service';
import { DashboardSummary } from '../../core/models';
@Component({selector:'app-dashboard',standalone:true,imports:[CommonModule],template:`
<section class="page"><div class="page-heading"><div><span class="eyebrow">Resumen ejecutivo</span><h1>Dashboard de Recursos Humanos</h1><p>Indicadores principales de personal, asistencia y solicitudes.</p></div><span class="status-pill">V1</span></div>
<div class="metric-grid" *ngIf="summary; else loading">
<article class="metric-card"><span>👥</span><strong>{{summary.activeEmployees}}</strong><small>Trabajadores activos</small></article>
<article class="metric-card"><span>✅</span><strong>{{summary.presentToday}}</strong><small>Presentes hoy</small></article>
<article class="metric-card"><span>⚠️</span><strong>{{summary.absentToday}}</strong><small>Ausentes hoy</small></article>
<article class="metric-card"><span>🏖️</span><strong>{{summary.employeesOnLeave}}</strong><small>De vacaciones/licencia</small></article>
<article class="metric-card"><span>📝</span><strong>{{summary.pendingRequests}}</strong><small>Solicitudes pendientes</small></article>
<article class="metric-card"><span>📄</span><strong>{{summary.expiringContracts}}</strong><small>Contratos por vencer</small></article>
</div><ng-template #loading><div class="empty-state">{{error||'Cargando indicadores...'}}</div></ng-template>
<div class="panel-grid"><article class="panel"><h2>Flujo principal</h2><div class="flow"><span>Empleado solicita</span><b>→</b><span>Jefe revisa</span><b>→</b><span>RR.HH. valida</span><b>→</b><span>Notificación</span></div></article><article class="panel"><h2>Módulos V1</h2><p>Organización, personal, legajo, contratos, horarios, asistencia, vacaciones, permisos, workflow, auditoría y reportes.</p></article></div></section>`})
export class DashboardComponent implements OnInit{summary?:DashboardSummary;error='';constructor(private readonly api:ApiService){}ngOnInit():void{this.api.dashboard().subscribe({next:v=>this.summary=v,error:()=>this.error='No se pudo conectar con RH_BACKEND. Verifica la URL del API.'});}}