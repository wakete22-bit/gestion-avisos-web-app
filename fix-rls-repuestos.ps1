# ========================================
# SCRIPT PARA SOLUCIONAR ERROR RLS EN REPUESTOS_ALBARAN
# ========================================

Write-Host "🔧 Solucionando error de RLS en tabla repuestos_albaran..." -ForegroundColor Yellow

# Opción 1: Deshabilitar RLS temporalmente (para desarrollo)
Write-Host "`n📋 Opción 1: Deshabilitar RLS temporalmente (RECOMENDADO para desarrollo)" -ForegroundColor Cyan
Write-Host "   Ejecuta este comando en tu base de datos Supabase:" -ForegroundColor White
Write-Host "   ALTER TABLE public.repuestos_albaran DISABLE ROW LEVEL SECURITY;" -ForegroundColor Green

# Opción 2: Crear políticas RLS apropiadas
Write-Host "`n📋 Opción 2: Crear políticas RLS apropiadas (RECOMENDADO para producción)" -ForegroundColor Cyan
Write-Host "   Ejecuta las políticas del archivo 'src/rls-policies.sql' en tu base de datos" -ForegroundColor White

# Opción 3: Política permisiva para desarrollo
Write-Host "`n📋 Opción 3: Política permisiva para desarrollo" -ForegroundColor Cyan
Write-Host "   Si prefieres mantener RLS pero con políticas permisivas:" -ForegroundColor White
Write-Host "   ALTER TABLE public.repuestos_albaran ENABLE ROW LEVEL SECURITY;" -ForegroundColor Green
Write-Host "   CREATE POLICY 'Política permisiva para desarrollo' ON public.repuestos_albaran FOR ALL USING (true) WITH CHECK (true);" -ForegroundColor Green

Write-Host "`n🚀 Pasos para ejecutar:" -ForegroundColor Yellow
Write-Host "1. Ve a tu dashboard de Supabase" -ForegroundColor White
Write-Host "2. Abre el SQL Editor" -ForegroundColor White
Write-Host "3. Ejecuta la Opción 1 (más simple para desarrollo)" -ForegroundColor White
Write-Host "4. Prueba crear un albarán nuevamente" -ForegroundColor White

Write-Host "`n✅ Después de ejecutar la solución, los repuestos se guardarán correctamente" -ForegroundColor Green
Write-Host "   y se mostrarán como tabla en lugar de JSON crudo." -ForegroundColor Green

Write-Host "`n⚠️  NOTA: La Opción 1 es solo para desarrollo. Para producción usa la Opción 2." -ForegroundColor Red
