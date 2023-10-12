import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect to the login page
      return false; // Prevent access to the route
    }
  }
}
