declare module '@mapbox/mapbox-gl-directions' {
  import { Map } from 'mapbox-gl';
  
  export default class MapboxDirections {
    constructor(options?: {
      accessToken?: string;
      unit?: 'metric' | 'imperial';
      profile?: 'driving' | 'walking' | 'cycling';
      alternatives?: boolean;
      geometries?: 'geojson' | 'polyline';
      controls?: {
        inputs?: boolean;
        instructions?: boolean;
        profileSwitcher?: boolean;
      };
      styles?: any[];
    });
    
    on(event: string, callback: (e: any) => void): void;
    off(event: string, callback: (e: any) => void): void;
    setOrigin(origin: { coordinates: [number, number]; name?: string }): void;
    setDestination(destination: { coordinates: [number, number]; name?: string }): void;
    addWaypoint(index: number, waypoint: { coordinates: [number, number]; name?: string }): void;
    removeRoutes(): void;
  }
}

