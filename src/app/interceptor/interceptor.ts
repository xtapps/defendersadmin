import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AdminService } from '../services/admin.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private adminService: AdminService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the user's token from your authentication service or wherever it's stored
    const authToken = localStorage.getItem('token');

    // Clone the request and add the Authorization header with the token
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Pass the modified request to the next handler
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.adminService.logout();
        }
        return throwError(error);
      })
    );
  }
}
