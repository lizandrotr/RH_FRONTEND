import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AuthUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  tenantId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly tokenKey = 'torresoft_people_access_token';
  private readonly userKey = 'torresoft_people_user';

  private readonly userSubject = new BehaviorSubject<AuthUser | null>(this.loadUser());
  readonly user$ = this.userSubject.asObservable();

  get currentUser(): AuthUser | null {
    return this.userSubject.value;
  }

  get accessToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get isAuthenticated(): boolean {
    const token = this.accessToken;
    if (!token || this.isExpired(token)) {
      if (token) this.clear();
      return false;
    }
    return !!this.currentUser;
  }

  setSession(token: string, user: AuthUser): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  clear(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.userSubject.next(null);
  }

  private loadUser(): AuthUser | null {
    const raw = localStorage.getItem(this.userKey);
    const token = localStorage.getItem(this.tokenKey);
    if (!raw || !token || this.isExpired(token)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
      return null;
    }

    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      localStorage.removeItem(this.userKey);
      return null;
    }
  }

  private isExpired(token: string): boolean {
    try {
      const payload = token.split('.')[1];
      if (!payload) return true;
      const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(normalized)) as { exp?: number };
      return !decoded.exp || decoded.exp * 1000 <= Date.now();
    } catch {
      return true;
    }
  }
}
