# Torresoft People — RH_FRONTEND

Frontend Angular para la versión 1 del SaaS de Recursos Humanos transversal a empresa privada y Estado.

## Stack
- Angular 18
- Standalone Components
- Angular Router
- HttpClient
- JWT
- CSS responsive sin dependencia de UI externa

## Autenticación

La aplicación ahora inicia en `/login` cuando no existe una sesión válida.

Flujo:

```text
/login
  ↓
POST /api/auth/login
  ↓
JWT + datos del usuario
  ↓
AuthSessionService
  ↓
AuthInterceptor
  ↓
Authorization: Bearer <token>
  ↓
AuthGuard
  ↓
Dashboard
```

Incluye:
- pantalla de inicio de sesión
- sesión JWT persistida en el navegador
- validación de expiración del token
- interceptor HTTP para JWT y TenantId
- protección de rutas mediante AuthGuard
- redirección al login cuando la sesión expira
- cierre de sesión desde el menú lateral

Usuario de desarrollo:
- Usuario: `admin`
- Contraseña: `Admin123!`

## Módulos incluidos
Dashboard RR.HH., Administración y catálogos, Organización, Personal, Legajo digital, Contratos, Documentos, Asistencia, Vacaciones/Permisos, Workflow, Portal del empleado, Portal del jefe, Auditoría y Reportes.

## Ejecutar
```bash
npm install
npm start
```

El frontend espera por defecto el API en `https://localhost:7067/api`. Cambiarlo en `src/environments/environment.ts` si el backend usa otro puerto.

## Tenant de desarrollo
`X-Tenant-Id: 11111111-1111-1111-1111-111111111111`

## Estado V1
Dashboard, Organización, Personal, Asistencia, Vacaciones/Permisos, Contratos, Catálogos, Auditoría y Workflow ya consumen endpoints del backend. Legajo, Documentos, Portal empleado/jefe y Reportes dejan lista la navegación para completar sus flujos específicos.
