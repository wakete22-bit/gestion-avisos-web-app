import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, timeout } from 'rxjs/operators';
import { inject } from '@angular/core';
import { PerformanceFixService } from '../services/performance-fix.service';

let requestCount = 0;
const MAX_CONCURRENT_REQUESTS = 5;
const REQUEST_TIMEOUT = 15000; // ✅ Reducir a 15 segundos

export function PerformanceInterceptor(
  request: HttpRequest<unknown>, 
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const performanceFix = inject(PerformanceFixService);
  
  // ✅ Mejorar manejo de peticiones concurrentes
  if (requestCount > MAX_CONCURRENT_REQUESTS) {
    console.warn('⚠️ Demasiadas peticiones concurrentes, forzando limpieza');
    performanceFix.forceCleanup();
    requestCount = 0;
  }

  return next(request).pipe(
    timeout(REQUEST_TIMEOUT),
    catchError((error: any) => {
      requestCount--;
      
      if (error.name === 'TimeoutError') {
        console.error('⏰ Timeout en petición, forzando limpieza');
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
