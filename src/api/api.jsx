//Acá inicializamos axios
import axios from "axios";

//Creamos la instancia con la configuración de nuestra ruta base
const api = axios.create({
    //Acepta atributos como ruta base para las peticiones
    baseURL: "http://localhost:8080",
    //Configuramos metadatos para la cabecera de las peticiones que lleva el tipo de contenido
    headers: {
        "Content-Type": "application/json"
    }
});


// Interceptores para incluir token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

//Exportamos nuestra instancia de axios
export default api;