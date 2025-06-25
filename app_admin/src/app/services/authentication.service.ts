import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from '../services/trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  // Get our token from Storage
  public getToken(): string {
    let out: any;
    out = this.storage.getItem('travlr-token');
    return out ? out : '';
  }

  // Save token to Storage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Remove token (logout)
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Check if user is logged in and token is valid
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  // Get the current user (call only if logged in)
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  // Login using tripDataService and save token
  public login(user: User, passwd: string): void {
    this.tripDataService.login(user, passwd)
      .subscribe({
        next: (value: any) => {
          if (value) {
            console.log(value); // Debug
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  // Register using tripDataService and save token
  public register(user: User, passwd: string): void {
    this.tripDataService.register(user, passwd)
      .subscribe({
        next: (value: any) => {
          if (value) {
            console.log(value); // Debug
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }
}