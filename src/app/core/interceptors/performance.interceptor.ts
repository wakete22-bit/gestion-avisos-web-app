import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

let requestCount = 0;
const MAX_CONCURRENT_REQUESTS = 5;
const REQUEST_TIMEOUT = 15000; // ✅ Reducir a 15 segundos

export function PerformanceInterceptor(
  request: HttpRequest<unknown>, 
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  // ✅ Incrementar contador de peticiones
  requestCount++;
  
  // ✅ Verificar límite de peticiones concurrentes
  if (requestCount > MAX_CONCURRENT_REQUESTS) {
    console.warn('⚠️ Demasiadas peticiones concurrentes, limitando requests');
    requestCount = Math.max(0, requestCount - 1);
  }
  
  return next(request).pipe(
    timeout(REQUEST_TIMEOUT),
    catchError((error: any) => {
      requestCount = Math.max(0, requestCount - 1);
      
      if (error.name === 'TimeoutError') {
        console.error('⏰ Timeout en petición HTTP');
      }
      
      return throwError(() => error);
    })
  );
}
