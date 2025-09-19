// Script de prueba para verificar la conexión de ajustes
// Este script puede ejecutarse en la consola del navegador para probar la funcionalidad

console.log('🧪 Iniciando prueba de conexión de ajustes...');

// Función para probar la conexión con Supabase
async function testSupabaseConnection() {
  try {
    // Simular la configuración de Supabase (reemplazar con tus valores reales)
    const supabaseUrl = 'TU_SUPABASE_URL';
    const supabaseKey = 'TU_SUPABASE_ANON_KEY';
    
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('✅ Cliente Supabase creado');
    
    // Probar conexión básica
    const { data, error } = await supabase
      .from('configuracion_empresa')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Error de conexión:', error);
      return false;
    }
    
    console.log('✅ Conexión a base de datos exitosa');
    console.log('📊 Datos encontrados:', data);
    
    return true;
  } catch (error) {
    console.error('❌ Error en la prueba:', error);
    return false;
  }
}

// Función para probar la creación de configuraciones por defecto
async function testCreateDefaultConfigs() {
  try {
    const supabaseUrl = 'TU_SUPABASE_URL';
    const supabaseKey = 'TU_SUPABASE_ANON_KEY';
    
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('🔧 Probando creación de configuraciones por defecto...');
    
    // Probar inserción de configuración de empresa
    const { data: empresaData, error: empresaError } = await supabase
      .from('configuracion_empresa')
      .insert([{
        nombre_empresa: 'Empresa de Prueba',
        cif: 'B12345678',
        direccion: 'Calle de Prueba 123',
        telefono: '+34 91 123 4567',
        email: 'prueba@empresa.com',
        web: 'https://www.empresa-prueba.com',
        logo_url: '',
        fecha_creacion: new Date().toISOString(),
        fecha_actualizacion: new Date().toISOString()
      }])
      .select();
    
    if (empresaError) {
      console.error('❌ Error creando configuración de empresa:', empresaError);
    } else {
      console.log('✅ Configuración de empresa creada:', empresaData);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error en la prueba de creación:', error);
    return false;
  }
}

// Ejecutar las pruebas
async function runTests() {
  console.log('🚀 Ejecutando pruebas de ajustes...');
  
  const connectionTest = await testSupabaseConnection();
  if (connectionTest) {
    console.log('✅ Prueba de conexión exitosa');
  } else {
    console.log('❌ Prueba de conexión falló');
  }
  
  const createTest = await testCreateDefaultConfigs();
  if (createTest) {
    console.log('✅ Prueba de creación exitosa');
  } else {
    console.log('❌ Prueba de creación falló');
  }
  
  console.log('🏁 Pruebas completadas');
}

// Exportar funciones para uso manual
window.testSupabaseConnection = testSupabaseConnection;
window.testCreateDefaultConfigs = testCreateDefaultConfigs;
window.runTests = runTests;

console.log('📝 Funciones de prueba disponibles:');
console.log('- testSupabaseConnection()');
console.log('- testCreateDefaultConfigs()');
console.log('- runTests()');
console.log('');
console.log('💡 Para usar, ejecuta: runTests()');
