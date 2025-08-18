import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, timeout } from 'rxjs/operators';
import { inject } from '@angular/core';
import { PerformanceFixService } from '../services/performance-fix.service';

let requestCount = 0;
const MAX_CONCURRENT_REQUESTS = 5;
const REQUEST_TIMEOUT = 30000; // 30 segundos

export function PerformanceInterceptor(
  request: HttpRequest<unknown>, 
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const performanceFix = inject(PerformanceFixService);
  
  // Contar peticiones concurrentes
  requestCount++;
  
  // Si hay demasiadas peticiones, forzar limpieza
  if (requestCount > MAX_CONCURRENT_REQUESTS) {
    performanceFix.forceCleanup();
    requestCount = 0;
  }

  // Aplicar timeout a todas las peticiones
  return next(request).pipe(
    timeout(REQUEST_TIMEOUT),
    catchError((error: any) => {
      requestCount--;
      
      // Si hay error de timeout, forzar limpieza
      if (error.name === 'TimeoutError') {
        performanceFix.forceCleanup();
      }
      
      return throwError(() => error);
    }),
    switchMap(event => {
      requestCount--;
      return [event];
    })
  );
}
