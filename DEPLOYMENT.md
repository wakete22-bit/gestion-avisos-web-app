# Instrucciones de Despliegue - Gestión de Avisos

## Problemas Solucionados

### 1. Error de MIME Type para módulos JavaScript
**Error**: `Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/html"`

**Solución**: Configuración de headers en `vercel.json` para servir archivos JavaScript con el MIME type correcto.

### 2. Error 401 en manifest.webmanifest
**Error**: `Failed to load resource: the server responded with a status of 401`

**Solución**: 
- Asegurar que el archivo `manifest.webmanifest` se copie correctamente durante el build
- Configurar headers apropiados en Vercel

## Configuración Actual

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "www"
      }
    }
  ],
  "routes": [
    {
      "src": "/manifest.webmanifest",
      "dest": "/manifest.webmanifest",
      "headers": {
        "Content-Type": "application/manifest+json",
        "Access-Control-Allow-Origin": "*"
      }
    },
    {
      "src": "/(.*\\.js)",
      "dest": "/$1",
      "headers": {
        "Content-Type": "application/javascript",
        "Access-Control-Allow-Origin": "*"
      }
    },
    {
      "src": "/(.*\\.css)",
      "dest": "/$1",
      "headers": {
        "Content-Type": "text/css",
        "Access-Control-Allow-Origin": "*"
      }
    },
    {
      "src": "/(.*\\.json)",
      "dest": "/$1",
      "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    },
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1",
      "headers": {
        "Access-Control-Allow-Origin": "*"
      }
    },
    {
      "src": "/svg/(.*)",
      "dest": "/svg/$1",
      "headers": {
        "Access-Control-Allow-Origin": "*"
      }
    },
    {
      "src": "/icons/(.*)",
      "dest": "/icons/$1",
      "headers": {
        "Access-Control-Allow-Origin": "*"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "buildCommand": "npm run build:prod",
  "outputDirectory": "www"
}
```

### package.json
```json
{
  "scripts": {
    "build:prod": "ng build --configuration production && npm run copy-manifest",
    "copy-manifest": "copy public\\manifest.webmanifest www\\manifest.webmanifest"
  }
}
```

### angular.json
Configuración de assets para asegurar que el manifest se copie:
```json
{
  "glob": "manifest.webmanifest",
  "input": "public",
  "output": "."
}
```

## Comandos de Despliegue

### Para desarrollo local:
```bash
npm run build:prod
```

### Para Vercel:
El despliegue automático usará `npm run build:prod` que incluye la copia del manifest.

## Verificación

Después del despliegue, verificar que:
1. El archivo `manifest.webmanifest` esté presente en la carpeta `www`
2. Los archivos JavaScript se sirvan con MIME type `application/javascript`
3. No haya errores 401 en la consola del navegador

## Notas Importantes

- Siempre usar `npm run build:prod` en lugar de `npm run build` para producción
- El archivo `manifest.webmanifest` debe estar en la carpeta `public/`
- Los headers de CORS están configurados para permitir acceso desde cualquier origen 