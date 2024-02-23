import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PartnerAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      let data: any = localStorage.getItem('userDetails');
      data = JSON.parse(data);
      if (data.userType !== "partnerLogin") {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect to the login page
      return false; // Prevent access to the route
    }
  }
}
