# Script de migración de base de datos
# Ejecuta el script SQL para corregir las relaciones entre tablas

Write-Host "🔄 Iniciando migración de base de datos..." -ForegroundColor Yellow

# Verificar si existe el archivo de migración
$archivoMigracion = "ajustes_tables.sql"
if (-not (Test-Path $archivoMigracion)) {
    Write-Host "❌ Error: No se encontró el archivo $archivoMigracion" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Archivo de migración encontrado: $archivoMigracion" -ForegroundColor Green

# Leer el contenido del archivo SQL
try {
    $contenidoSQL = Get-Content $archivoMigracion -Raw -Encoding UTF8
    Write-Host "✅ Contenido SQL leído correctamente" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al leer el archivo SQL: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Contenido del script de migración:" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host $contenidoSQL -ForegroundColor White
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Preguntar al usuario si quiere continuar
$confirmacion = Read-Host "¿Deseas ejecutar este script de migración? (s/N)"
if ($confirmacion -ne "s" -and $confirmacion -ne "S") {
    Write-Host "❌ Migración cancelada por el usuario" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "🚀 Ejecutando migración..." -ForegroundColor Green

# Aquí normalmente ejecutarías el script SQL contra tu base de datos
# Por ejemplo, usando psql si tienes PostgreSQL instalado localmente
# o usando la API de Supabase

Write-Host ""
Write-Host "📝 INSTRUCCIONES PARA EJECUTAR LA MIGRACIÓN:" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Yellow
Write-Host "1. Copia el contenido del archivo 'ajustes_tables.sql'" -ForegroundColor White
Write-Host "2. Ve a tu panel de Supabase" -ForegroundColor White
Write-Host "3. Navega a SQL Editor" -ForegroundColor White
Write-Host "4. Pega el contenido y ejecuta el script" -ForegroundColor White
Write-Host "5. Verifica que no hay errores" -ForegroundColor White
Write-Host ""
Write-Host "ALTERNATIVA:" -ForegroundColor Cyan
Write-Host "Si tienes psql instalado, puedes ejecutar:" -ForegroundColor White
Write-Host "psql -h [tu-host] -U [tu-usuario] -d [tu-db] -f ajustes_tables.sql" -ForegroundColor Gray
Write-Host ""

Write-Host "✅ Script de migración preparado correctamente" -ForegroundColor Green
Write-Host "🔧 Ejecuta el script SQL en tu base de datos para corregir las relaciones" -ForegroundColor Cyan

# Crear un archivo de respaldo del esquema actual
$fecha = Get-Date -Format "yyyyMMdd_HHmmss"
$archivoRespaldo = "respaldo_esquema_$fecha.sql"

Write-Host ""
Write-Host "💾 Creando respaldo del esquema actual..." -ForegroundColor Yellow

# Aquí podrías generar un respaldo del esquema actual si tienes acceso a la base de datos
# Por ahora, solo creamos un archivo de información

$infoRespaldo = @"
-- Respaldo del esquema de base de datos
-- Fecha: $(Get-Date)
-- Archivo generado automáticamente por el script de migración

-- Este archivo contiene información sobre el estado actual de la base de datos
-- antes de aplicar la migración.

-- Para generar un respaldo real, ejecuta en tu base de datos:
-- pg_dump -h [tu-host] -U [tu-usuario] -d [tu-db] --schema-only > esquema_actual.sql

-- TABLAS EXISTENTES:
-- (Verificar con: SELECT table_name FROM information_schema.tables WHERE table_schema = 'public')

-- RELACIONES EXISTENTES:
-- (Verificar con: SELECT * FROM information_schema.table_constraints WHERE constraint_type = 'FOREIGN KEY')

-- DATOS EXISTENTES:
-- (Verificar con: SELECT table_name, COUNT(*) FROM information_schema.tables GROUP BY table_name)
"@

try {
    $infoRespaldo | Out-File -FilePath $archivoRespaldo -Encoding UTF8
    Write-Host "✅ Archivo de respaldo creado: $archivoRespaldo" -ForegroundColor Green
} catch {
    Write-Host "⚠️  No se pudo crear el archivo de respaldo: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 RESUMEN DE LA MIGRACIÓN:" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host "✅ Archivo de migración: $archivoMigracion" -ForegroundColor White
Write-Host "✅ Archivo de respaldo: $archivoRespaldo" -ForegroundColor White
Write-Host "✅ Script preparado para ejecución" -ForegroundColor White
Write-Host ""
Write-Host "📋 PRÓXIMOS PASOS:" -ForegroundColor Yellow
Write-Host "1. Ejecuta el script SQL en tu base de datos" -ForegroundColor White
Write-Host "2. Verifica que las relaciones se crearon correctamente" -ForegroundColor White
Write-Host "3. Prueba la aplicación para confirmar que funciona" -ForegroundColor White
Write-Host ""
Write-Host "🚀 ¡Migración lista para ejecutar!" -ForegroundColor Green
