# Script URGENTE para corregir relaciones de base de datos
# ⚠️ EJECUTAR INMEDIATAMENTE para resolver el error de presupuestos

Write-Host "🚨 SCRIPT URGENTE DE CORRECCIÓN DE BASE DE DATOS" -ForegroundColor Red
Write-Host "==================================================" -ForegroundColor Red
Write-Host ""

Write-Host "❌ ERROR ACTUAL:" -ForegroundColor Red
Write-Host "Could not find a relationship between 'avisos' and 'presupuestos' in the schema cache" -ForegroundColor Yellow
Write-Host ""

Write-Host "🎯 SOLUCIÓN:" -ForegroundColor Green
Write-Host "Ejecutar el script SQL 'corregir_relaciones_urgente.sql' en Supabase" -ForegroundColor Cyan
Write-Host ""

# Verificar que existe el archivo urgente
$archivoUrgente = "corregir_relaciones_urgente.sql"
if (-not (Test-Path $archivoUrgente)) {
    Write-Host "❌ ERROR CRÍTICO: No se encontró el archivo $archivoUrgente" -ForegroundColor Red
    Write-Host "Este archivo es esencial para resolver el problema" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Archivo urgente encontrado: $archivoUrgente" -ForegroundColor Green

# Leer y mostrar el contenido del script urgente
try {
    $contenidoUrgente = Get-Content $archivoUrgente -Raw -Encoding UTF8
    Write-Host "✅ Script SQL urgente leído correctamente" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al leer el script urgente: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 CONTENIDO DEL SCRIPT URGENTE:" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host $contenidoUrgente -ForegroundColor White
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "🚨 INSTRUCCIONES URGENTES:" -ForegroundColor Red
Write-Host "================================================" -ForegroundColor Red
Write-Host "1. ⚠️  COPIA TODO el contenido del script SQL de arriba" -ForegroundColor Yellow
Write-Host "2. 🌐 Ve a tu panel de Supabase AHORA MISMO" -ForegroundColor Yellow
Write-Host "3. 📝 Abre SQL Editor y crea una nueva query" -ForegroundColor Yellow
Write-Host "4. 📋 Pega el contenido del script SQL" -ForegroundColor Yellow
Write-Host "5. ▶️  Ejecuta el script COMPLETO" -ForegroundColor Yellow
Write-Host "6. ✅ Verifica que no hay errores" -ForegroundColor Yellow
Write-Host "7. 🔄 Prueba la aplicación" -ForegroundColor Yellow
Write-Host ""

Write-Host "⏰ TIEMPO ESTIMADO: 2-3 minutos" -ForegroundColor Cyan
Write-Host ""

# Preguntar si el usuario quiere que se abra Supabase
$abrirSupabase = Read-Host "¿Quieres que se abra Supabase en tu navegador? (s/N)"
if ($abrirSupabase -eq "s" -or $abrirSupabase -eq "S") {
    try {
        Start-Process "https://supabase.com/dashboard"
        Write-Host "✅ Supabase abierto en tu navegador" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  No se pudo abrir Supabase automáticamente" -ForegroundColor Yellow
        Write-Host "🌐 Ve manualmente a: https://supabase.com/dashboard" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "🔧 PASOS DETALLADOS EN SUPABASE:" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Yellow
Write-Host "1. Inicia sesión en tu cuenta de Supabase" -ForegroundColor White
Write-Host "2. Selecciona tu proyecto" -ForegroundColor White
Write-Host "3. En el menú lateral, haz clic en 'SQL Editor'" -ForegroundColor White
Write-Host "4. Haz clic en 'New query'" -ForegroundColor White
Write-Host "5. Pega el script SQL completo" -ForegroundColor White
Write-Host "6. Haz clic en 'Run' para ejecutar" -ForegroundColor White
Write-Host "7. Espera a que termine la ejecución" -ForegroundColor White
Write-Host "8. Verifica que no hay errores en la consola" -ForegroundColor White
Write-Host ""

Write-Host "✅ VERIFICACIÓN POST-EJECUCIÓN:" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host "• No debe haber errores en la consola SQL" -ForegroundColor White
Write-Host "• Debe aparecer 'MIGRACIÓN COMPLETADA'" -ForegroundColor White
Write-Host "• Las relaciones deben estar listadas correctamente" -ForegroundColor White
Write-Host ""

Write-Host "🔄 DESPUÉS DE EJECUTAR EL SCRIPT:" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "1. Regresa a tu aplicación Angular" -ForegroundColor White
Write-Host "2. Navega a la página de avisos" -ForegroundColor White
Write-Host "3. Verifica que no hay errores en la consola del navegador" -ForegroundColor White
Write-Host "4. Confirma que los datos se cargan correctamente" -ForegroundColor White
Write-Host ""

Write-Host "🚨 SI PERSISTEN LOS ERRORES:" -ForegroundColor Red
Write-Host "================================================" -ForegroundColor Red
Write-Host "• Verifica que ejecutaste TODO el script SQL" -ForegroundColor Yellow
Write-Host "• Revisa los logs de Supabase para errores" -ForegroundColor Yellow
Write-Host "• Confirma que las relaciones se crearon correctamente" -ForegroundColor Yellow
Write-Host "• Contacta al equipo de desarrollo si es necesario" -ForegroundColor Yellow
Write-Host ""

Write-Host "🎯 RESUMEN DE ACCIÓN URGENTE:" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host "✅ Archivo SQL urgente: $archivoUrgente" -ForegroundColor White
Write-Host "✅ Script preparado para ejecución" -ForegroundColor White
Write-Host "✅ Instrucciones detalladas proporcionadas" -ForegroundColor White
Write-Host ""
Write-Host "🚀 ¡EJECUTA EL SCRIPT SQL EN SUPABASE AHORA MISMO!" -ForegroundColor Red
Write-Host ""

# Crear un archivo de instrucciones rápidas
$instruccionesRapidas = @"
INSTRUCCIONES RÁPIDAS PARA CORREGIR LA BASE DE DATOS:

1. Ve a: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Haz clic en "SQL Editor" en el menú lateral
4. Haz clic en "New query"
5. Copia y pega TODO el contenido del archivo 'corregir_relaciones_urgente.sql'
6. Haz clic en "Run"
7. Espera a que termine
8. Verifica que no hay errores
9. Prueba tu aplicación

TIEMPO ESTIMADO: 2-3 minutos
"@

try {
    $instruccionesRapidas | Out-File -FilePath "INSTRUCCIONES_RAPIDAS.txt" -Encoding UTF8
    Write-Host "✅ Archivo de instrucciones rápidas creado: INSTRUCCIONES_RAPIDAS.txt" -ForegroundColor Green
} catch {
    Write-Host "⚠️  No se pudo crear el archivo de instrucciones rápidas" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📁 ARCHIVOS DISPONIBLES:" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "• corregir_relaciones_urgente.sql - Script SQL urgente" -ForegroundColor White
Write-Host "• INSTRUCCIONES_RAPIDAS.txt - Instrucciones paso a paso" -ForegroundColor White
Write-Host "• README_MIGRACION.md - Documentación completa" -ForegroundColor White
Write-Host ""

Write-Host "🎉 ¡TODO LISTO PARA LA CORRECCIÓN URGENTE!" -ForegroundColor Green
Write-Host "Ejecuta el script SQL en Supabase y resuelve el problema de una vez por todas." -ForegroundColor Cyan
