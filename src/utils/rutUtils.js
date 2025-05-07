// Función de validación de RUT (agrégala en utils/rutUtils.js)
export const validarRUT = (rut) => {
  const rutLimpio = rut.replace(/[.-]/g, '').toUpperCase();
  if (!/^\d{7,8}[0-9K]$/.test(rutLimpio)) return false;
  
  const dv = rutLimpio.slice(-1);
  const numero = rutLimpio.slice(0, -1);
  return calcularDigitoVerificador(numero) === dv;
};