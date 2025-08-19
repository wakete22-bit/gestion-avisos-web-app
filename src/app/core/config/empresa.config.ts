// Configuración de datos de la empresa para las plantillas de factura
export const configuracionEmpresa = {
  nombre: 'TÉCNICOS CLIMATIZACIÓN S.L.',
  direccion: 'Calle de la Tecnología, 123',
  ciudad: '28001 Madrid, España',
  cif: 'B12345678',
  telefono: '+34 91 123 45 67',
  email: 'info@tecnicosclimatizacion.es',
  web: 'www.tecnicosclimatizacion.es',
  logo: 'assets/icon/LogoGestionAvisos.png',
  
  // Información bancaria (opcional)
  banco: {
    nombre: 'Banco Ejemplo S.A.',
    iban: 'ES91 2100 0418 4502 0005 1332',
    swift: 'CAIXESBBXXX'
  },
  
  // Configuración de facturación
  facturacion: {
    iva: 21, // Porcentaje de IVA
    moneda: 'EUR',
    plazoPago: '30 días',
    condiciones: 'Pago por transferencia bancaria'
  }
};

// Función helper para obtener datos de la empresa
export const obtenerDatosEmpresa = () => {
  return configuracionEmpresa;
};

// Función helper para formatear datos de contacto
export const formatearContacto = () => {
  const empresa = configuracionEmpresa;
  return {
    direccionCompleta: `${empresa.direccion}, ${empresa.ciudad}`,
    contacto: `${empresa.telefono} | ${empresa.email}`,
    identificacion: `CIF: ${empresa.cif}`
  };
};
