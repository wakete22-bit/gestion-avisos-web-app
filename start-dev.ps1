Write-Host "Iniciando aplicación de desarrollo..." -ForegroundColor Green
Write-Host ""

Write-Host "[1/1] Iniciando frontend en puerto 4200..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start" -WindowStyle Normal

Write-Host ""
Write-Host "Aplicación iniciada:" -ForegroundColor Green
Write-Host "- Frontend: http://localhost:4200" -ForegroundColor Cyan
Write-Host "- Supabase: Configurado automáticamente" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona cualquier tecla para cerrar esta ventana..." -ForegroundColor Yellow
Read-Host 