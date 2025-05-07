import axios from 'axios';

const API_URL = 'https://prod-backendecomarket.onrender.com/api'; // Asegúrate que coincida con tu backend

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categorias`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Opcional: Puedes agregar más funciones relacionadas con categorías
export const createCategory = async (categoryData, token) => {
  return await axios.post(`${API_URL}/categorias`, categoryData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};