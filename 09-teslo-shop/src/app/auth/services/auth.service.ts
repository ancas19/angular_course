import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthResponse } from '@auth/interfaces/auth-respose.interface';
import { UserRegister } from '@auth/interfaces/user-register.interface';
import { User } from '@auth/interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>("checking");
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token') || null);

  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    loader: () => this.checkStatus()
  })


  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    if (this._user()) {
      return 'authenticated';
    }
    return 'not-authenticated';

  });

  user = computed<User | null>(() => this._user());
  token = computed<string | null>(() => this._token());
  isAdmin = computed(() => this._user()?.roles.includes('admin')?? false);

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, { email: email, password: password })
      .pipe(
        map(response => this.handleAuthSuccess(response)),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  registerUser(user:UserRegister):Observable<boolean>{
    console.log('Registering user:', user);
    return this.http.post<AuthResponse>(`${baseUrl}/auth/register`,user)
    .pipe(
      map(response => this.handleAuthSuccess(response)),
      catchError((error: any) => this.handleAuthError(error))
    )
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return this.handleAuthError({});
    }
    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`)
      .pipe(
        map(response => this.handleAuthSuccess(response)),
        catchError((error: any) => this.handleAuthError(error))
      );
  }


  logout() {
    this._authStatus.set('not-authenticated');
    this._user.set(null);
    this._token.set(null);
    localStorage.clear();
  }

  private handleAuthSuccess(response: AuthResponse): boolean {
    this._user.set(response.user);
    this._token.set(response.token);
    this._authStatus.set('authenticated');
    localStorage.setItem('token', response.token);
    return true;
  }

  private handleAuthError(error: any): Observable<boolean> {
    this.logout();
    return of(false);
  }
}
