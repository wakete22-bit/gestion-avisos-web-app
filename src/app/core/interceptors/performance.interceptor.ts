import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

let activeRequests = 0;
const maxConcurrentRequests = 5; // Límite de requests concurrentes
const requestQueue: Array<() => void> = [];

export function PerformanceInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  // Si excedemos el límite de requests concurrentes, mostrar advertencia
  if (activeRequests >= maxConcurrentRequests) {
    console.warn('⚠️ Demasiadas peticiones concurrentes, limitando requests');
  }

  activeRequests++;

  return next(req).pipe(
    finalize(() => {
      activeRequests--;
      
      // Procesar siguiente request en la cola si existe
      if (requestQueue.length > 0) {
        const nextRequest = requestQueue.shift();
        if (nextRequest) {
          nextRequest();
        }
      }
    })
  );
}