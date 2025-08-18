# Script de construcción para producción con logging deshabilitado
Write-Host "🚀 Construyendo aplicación para PRODUCCIÓN..." -ForegroundColor Green

# Limpiar builds anteriores
Write-Host "🧹 Limpiando builds anteriores..." -ForegroundColor Yellow
if (Test-Path "www") {
    Remove-Item -Recurse -Force "www"
}

# Instalar dependencias si es necesario
Write-Host "📦 Verificando dependencias..." -ForegroundColor Yellow
npm install

# Construir para producción
Write-Host "🔨 Construyendo aplicación en modo PRODUCCIÓN..." -ForegroundColor Cyan
ng build --configuration=production

# Verificar que no haya logs en el build
Write-Host "🔍 Verificando que no haya logs de debug..." -ForegroundColor Yellow
$jsFiles = Get-ChildItem -Path "www" -Filter "*.js" -Recurse
$logCount = 0

foreach ($file in $jsFiles) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match "console\.log|console\.debug|console\.info|console\.warn") {
        $logCount++
        Write-Host "⚠️  Archivo con logs encontrado: $($file.Name)" -ForegroundColor Yellow
    }
}

if ($logCount -eq 0) {
    Write-Host "✅ No se encontraron logs de debug en el build" -ForegroundColor Green
} else {
    Write-Host "⚠️  Se encontraron $logCount archivos con logs" -ForegroundColor Yellow
}

Write-Host "🎉 Construcción completada!" -ForegroundColor Green
Write-Host "📁 Archivos generados en: www/" -ForegroundColor Cyan
Write-Host "🌐 Listo para despliegue en producción" -ForegroundColor Green
