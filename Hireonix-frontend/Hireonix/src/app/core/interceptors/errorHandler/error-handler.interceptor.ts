import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const localService = inject(LocalStorageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('🔴 Global Error:', error.error);
      switch (error.status) {
        case 401:
          console.warn('Unauthorized. Redirecting to login...');
          localService.removeToken();
          router.navigate(['/login']);
          break;

        case 403:
          console.warn('Access denied.');
          break;

        case 404:
          console.warn('Resource not found.');
          break;

        case 500:
          console.warn('Server error. Try again later.');
          break;

        default:
          console.warn('An unexpected error occurred.');
          break;
      }

      return throwError(() => error.error);
    })
  );
};
