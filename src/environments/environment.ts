// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  enableLogging: true,
  enableDebug: true,
  logLevel: 'debug', // Todo el logging en desarrollo
  maptilerApiKey: 'AlWSqnyOeMHGBjtAcVcc',
  // API Keys para routing - Añadir tus propias keys aquí
  googleMapsApiKey: '', // Añadir tu Google Maps API Key
  openRouteServiceApiKey: '', // Añadir tu OpenRouteService API Key
  apiUrl: 'http://localhost:3000/api',
  supabaseUrl: 'https://qqoxlnkfcstqfigjjygf.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxb3hsbmtmY3N0cWZpZ2pqeWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NDM2MzksImV4cCI6MjA2MzUxOTYzOX0.YVeNEDkP5uSdIuuH7MPpU29SRJUSmTXORKh9dBuBvtM',
  // Service Role Key - Bypassa RLS para operaciones del sistema
  supabaseServiceKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxb3hsbmtmY3N0cWZpZ2pqeWdmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Nzk0MzYzOSwiZXhwIjoyMDYzNTE5NjM5fQ.B4kqEse-leW616c9UPk-1d08kt7H2PJYQWyRUB6akBM'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
