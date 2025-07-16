@echo off
echo Iniciando aplicación de desarrollo...
echo.

echo [1/1] Iniciando frontend en puerto 4200...
start "Frontend - Puerto 4200" cmd /k "npm start"

echo.
echo Aplicación iniciada:
echo - Frontend: http://localhost:4200
echo - Supabase: Configurado automáticamente
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul 