// src/utils/rutUtils.js
export function validarRUT(rut) {
    const rutLimpio = rut.replace(/[.-]/g, '').toUpperCase();
    const [cuerpo, dv] = rutLimpio.split('-');
  
    if (!cuerpo || !dv || cuerpo.length < 7) return false;
  
    let suma = 0;
    let multiplo = 2;
  
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += Number(cuerpo.charAt(i)) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
  
    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
  
    return dv === dvCalculado;
  }