import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuditLog,AttendanceMark,CatalogItem,DashboardSummary,Employee,EmploymentContract,LeaveRequest,OrganizationUnit,Position,WorkflowDefinition } from './models';
@Injectable({providedIn:'root'})
export class ApiService{
  private readonly baseUrl=environment.apiUrl;
  private readonly headers=new HttpHeaders({'X-Tenant-Id':environment.tenantId});
  constructor(private readonly http:HttpClient){}
  dashboard():Observable<DashboardSummary>{return this.http.get<DashboardSummary>(`${this.baseUrl}/dashboard/summary`,{headers:this.headers});}
  employees(search=''):Observable<Employee[]>{let params=new HttpParams();if(search)params=params.set('search',search);return this.http.get<Employee[]>(`${this.baseUrl}/employees`,{headers:this.headers,params});}
  createEmployee(payload:unknown):Observable<Employee>{return this.http.post<Employee>(`${this.baseUrl}/employees`,payload,{headers:this.headers});}
  units():Observable<OrganizationUnit[]>{return this.http.get<OrganizationUnit[]>(`${this.baseUrl}/organization/units`,{headers:this.headers});}
  createUnit(payload:unknown):Observable<OrganizationUnit>{return this.http.post<OrganizationUnit>(`${this.baseUrl}/organization/units`,payload,{headers:this.headers});}
  positions():Observable<Position[]>{return this.http.get<Position[]>(`${this.baseUrl}/organization/positions`,{headers:this.headers});}
  createPosition(payload:unknown):Observable<Position>{return this.http.post<Position>(`${this.baseUrl}/organization/positions`,payload,{headers:this.headers});}
  attendanceMarks(date:string):Observable<AttendanceMark[]>{const params=new HttpParams().set('date',date);return this.http.get<AttendanceMark[]>(`${this.baseUrl}/attendance/marks`,{headers:this.headers,params});}
  createAttendanceMark(payload:unknown):Observable<AttendanceMark>{return this.http.post<AttendanceMark>(`${this.baseUrl}/attendance/marks`,payload,{headers:this.headers});}
  leaveRequests(status=''):Observable<LeaveRequest[]>{let params=new HttpParams();if(status)params=params.set('status',status);return this.http.get<LeaveRequest[]>(`${this.baseUrl}/leave/requests`,{headers:this.headers,params});}
  createLeave(payload:unknown):Observable<LeaveRequest>{return this.http.post<LeaveRequest>(`${this.baseUrl}/leave/requests`,payload,{headers:this.headers});}
  reviewLeave(id:string,status:string,comment=''):Observable<LeaveRequest>{return this.http.put<LeaveRequest>(`${this.baseUrl}/leave/requests/${id}/review`,{status,comment},{headers:this.headers});}
  contracts(employeeId:string):Observable<EmploymentContract[]>{return this.http.get<EmploymentContract[]>(`${this.baseUrl}/employees/${employeeId}/contracts`,{headers:this.headers});}
  createContract(employeeId:string,payload:unknown):Observable<EmploymentContract>{return this.http.post<EmploymentContract>(`${this.baseUrl}/employees/${employeeId}/contracts`,payload,{headers:this.headers});}
  catalogs(category=''):Observable<CatalogItem[]>{let params=new HttpParams();if(category)params=params.set('category',category);return this.http.get<CatalogItem[]>(`${this.baseUrl}/configuration/catalogs`,{headers:this.headers,params});}
  createCatalog(payload:unknown):Observable<CatalogItem>{return this.http.post<CatalogItem>(`${this.baseUrl}/configuration/catalogs`,payload,{headers:this.headers});}
  audit():Observable<AuditLog[]>{return this.http.get<AuditLog[]>(`${this.baseUrl}/configuration/audit`,{headers:this.headers});}
  workflows():Observable<WorkflowDefinition[]>{return this.http.get<WorkflowDefinition[]>(`${this.baseUrl}/workflows`,{headers:this.headers});}
  createWorkflow(payload:unknown):Observable<unknown>{return this.http.post(`${this.baseUrl}/workflows`,payload,{headers:this.headers});}
}