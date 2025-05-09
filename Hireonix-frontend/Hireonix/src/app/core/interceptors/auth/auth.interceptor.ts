import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localService: LocalStorageService = inject(LocalStorageService);
  const token: null | string | undefined = localService.gettoken();

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
