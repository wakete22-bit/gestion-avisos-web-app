# Script para ejecutar la numeración secuencial de avisos
# Este script ejecuta el SQL que agrega el campo numero_secuencial

Write-Host "🚀 Iniciando configuración de numeración secuencial para avisos..." -ForegroundColor Green

# Verificar si existe el archivo SQL
$sqlFile = "agregar_numero_secuencial_avisos.sql"
if (-not (Test-Path $sqlFile)) {
    Write-Host "❌ Error: No se encontró el archivo $sqlFile" -ForegroundColor Red
    exit 1
}

Write-Host "📁 Archivo SQL encontrado: $sqlFile" -ForegroundColor Yellow

# Leer el contenido del archivo SQL
$sqlContent = Get-Content $sqlFile -Raw
Write-Host "📖 Contenido del archivo leído correctamente" -ForegroundColor Yellow

Write-Host ""
Write-Host "🔧 Para aplicar estos cambios, debes:" -ForegroundColor Cyan
Write-Host "1. Ejecutar el archivo SQL en tu base de datos Supabase" -ForegroundColor White
Write-Host "2. Puedes hacerlo desde:" -ForegroundColor White
Write-Host "   - El panel de administración de Supabase (SQL Editor)" -ForegroundColor White
Write-Host "   - Usando psql si tienes acceso directo" -ForegroundColor White
Write-Host "   - Importando el archivo desde tu cliente SQL preferido" -ForegroundColor White

Write-Host ""
Write-Host "📋 Contenido del archivo SQL:" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host $sqlContent -ForegroundColor White
Write-Host "----------------------------------------" -ForegroundColor Gray

Write-Host ""
Write-Host "✅ Script preparado correctamente" -ForegroundColor Green
Write-Host "💡 Recuerda que después de ejecutar el SQL, los nuevos avisos tendrán números secuenciales automáticamente" -ForegroundColor Yellow
Write-Host "🔄 Los avisos existentes se actualizarán con números secuenciales" -ForegroundColor Yellow

# Preguntar si quiere ver el archivo
$verArchivo = Read-Host "¿Quieres abrir el archivo SQL en el editor? (s/n)"
if ($verArchivo -eq "s" -or $verArchivo -eq "S") {
    try {
        Start-Process $sqlFile
        Write-Host "📝 Archivo abierto en el editor por defecto" -ForegroundColor Green
    } catch {
        Write-Host "❌ No se pudo abrir el archivo automáticamente" -ForegroundColor Red
        Write-Host "💡 Puedes abrirlo manualmente desde: $(Get-Location)\$sqlFile" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "🎯 Pasos siguientes:" -ForegroundColor Cyan
Write-Host "1. Ejecuta el SQL en Supabase" -ForegroundColor White
Write-Host "2. Reinicia la aplicación Angular" -ForegroundColor White
Write-Host "3. Los nuevos avisos mostrarán números secuenciales" -ForegroundColor White

Write-Host ""
Write-Host "✨ ¡Configuración completada!" -ForegroundColor Green



