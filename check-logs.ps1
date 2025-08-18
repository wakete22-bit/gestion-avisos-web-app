# Script para verificar que no hay logs en el build de producción
Write-Host "🔍 Verificando logs en el build de producción..." -ForegroundColor Cyan

if (-not (Test-Path "www")) {
    Write-Host "❌ Error: No se encontró la carpeta 'www/'" -ForegroundColor Red
    Write-Host "💡 Ejecuta primero: ng build --configuration=production" -ForegroundColor Yellow
    exit 1
}

$jsFiles = Get-ChildItem -Path "www" -Filter "*.js" -Recurse
$logCount = 0
$filesWithLogs = @()

Write-Host "📁 Analizando $($jsFiles.Count) archivos JavaScript..." -ForegroundColor Yellow

foreach ($file in $jsFiles) {
    try {
        $content = Get-Content $file.FullName -Raw -ErrorAction Stop
        
        # Buscar diferentes tipos de logs
        $hasLogs = $false
        $logTypes = @()
        
        if ($content -match "console\.log") {
            $hasLogs = $true
            $logTypes += "console.log"
        }
        if ($content -match "console\.debug") {
            $hasLogs = $true
            $logTypes += "console.debug"
        }
        if ($content -match "console\.info") {
            $hasLogs = $true
            $logTypes += "console.info"
        }
        if ($content -match "console\.warn") {
            $hasLogs = $true
            $logTypes += "console.warn"
        }
        
        if ($hasLogs) {
            $logCount++
            $filesWithLogs += @{
                Name = $file.Name
                Path = $file.FullName
                Types = $logTypes -join ", "
            }
        }
    }
    catch {
        Write-Host "⚠️  Error leyendo archivo: $($file.Name)" -ForegroundColor Yellow
    }
}

Write-Host "`n📊 Resultados de la verificación:" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

if ($logCount -eq 0) {
    Write-Host "✅ EXCELENTE: No se encontraron logs de debug" -ForegroundColor Green
    Write-Host "🎯 El build está listo para producción" -ForegroundColor Green
} else {
    Write-Host "❌ PROBLEMA: Se encontraron $logCount archivos con logs" -ForegroundColor Red
    Write-Host "`n📋 Archivos con logs:" -ForegroundColor Yellow
    
    foreach ($file in $filesWithLogs) {
        Write-Host "  • $($file.Name) - $($file.Types)" -ForegroundColor Red
    }
    
    Write-Host "`n🔧 Soluciones:" -ForegroundColor Yellow
    Write-Host "  1. Verificar que se usó --configuration=production" -ForegroundColor White
    Write-Host "  2. Limpiar y reconstruir: ng build --configuration=production" -ForegroundColor White
    Write-Host "  3. Verificar environment.prod.ts" -ForegroundColor White
}

Write-Host "`n🎉 Verificación completada!" -ForegroundColor Green
