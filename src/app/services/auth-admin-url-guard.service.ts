import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { adminUrl } from 'src/config/config';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminUrlGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (window.location.host !== adminUrl && window.location.host.search('localhost:4200') < 0) {
      this.router.navigate(['/partnerLogin']);
      return false;
    } else {
      return true;
    }
  }
}
