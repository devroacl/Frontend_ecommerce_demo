export const cleanRut = (rut) => {
  return rut.replace(/[^0-9kK]/g, '').toUpperCase();
};

export const validateRut = (rut) => {
  if (!rut || typeof rut !== 'string') return false;
  
  const cleanedRut = cleanRut(rut);
  if (cleanedRut.length < 2) return false;
  
  const rutNumber = cleanedRut.slice(0, -1);
  const dv = cleanedRut.slice(-1);
  
  if (!/^\d+$/.test(rutNumber)) return false;
  
  const calculatedDv = calculateDv(rutNumber);
  return dv === calculatedDv;
};

export const calculateDv = (rutNumber) => {
  let sum = 0;
  let multiplier = 2;
  
  for (let i = rutNumber.length - 1; i >= 0; i--) {
    sum += parseInt(rutNumber.charAt(i)) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const remainder = sum % 11;
  const dv = 11 - remainder;
  
  if (dv === 10) return 'K';
  if (dv === 11) return '0';
  return dv.toString();
};

export const formatRut = (rut) => {
  const cleanedRut = cleanRut(rut);
  if (cleanedRut.length < 2) return rut;
  
  const rutNumber = cleanedRut.slice(0, -1);
  const dv = cleanedRut.slice(-1);
  
  let formatted = '';
  for (let i = rutNumber.length - 1, j = 1; i >= 0; i--, j++) {
    formatted = rutNumber.charAt(i) + formatted;
    if (j % 3 === 0 && i !== 0) formatted = '.' + formatted;
  }
  
  return formatted + '-' + dv;
};