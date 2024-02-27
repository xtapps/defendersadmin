import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { partnerUrl } from 'src/config/config';

@Injectable({
  providedIn: 'root',
})
export class AuthPartnerUrlGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (window.location.host !== partnerUrl && window.location.host.search('localhost:4300') < 0) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
