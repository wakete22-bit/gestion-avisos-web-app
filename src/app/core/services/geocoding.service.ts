import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface MaptilerGeocodeResponse {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: [number, number];
    };
    place_name: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private baseUrl = 'https://api.maptiler.com/geocoding';

  constructor(private http: HttpClient) { }

  geocode(address: string): Observable<[number, number] | null> {
    const url = `${this.baseUrl}/${encodeURIComponent(address)}.json?key=${environment.maptilerApiKey}`;
    
    return this.http.get<MaptilerGeocodeResponse>(url).pipe(
      map(response => {
        if (response && response.features && response.features.length > 0) {
          return response.features[0].geometry.coordinates as [number, number];
        }
        return null;
      }),
      catchError(error => {
        console.error('Error en geocodificación:', error);
        return of(null);
      })
    );
  }
}
