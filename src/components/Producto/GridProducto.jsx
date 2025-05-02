import React, { useEffect, useState, useMemo } from "react";
import { useTheme } from "../../context/themeContext";
import ProductCard from "./ProductoCard";
import { productoService } from "../../service/ProductoService";

export default function GridProducto({ categoria }) {
    const { colors } = useTheme();
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Memoizar el objeto de categorías para evitar recreación en cada render
    const categorias = useMemo(() => ({
        hombre: "HOMBRE",
        mujer: "MUJER",
        ninos: "NINOS"
    }), []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setCargando(true);
                
                if (!categorias[categoria]) {
                    throw new Error('Categoría inválida');
                }

                const data = await productoService.getByCategory(categorias[categoria]);
                setProductos(data);
            } catch (err) {
                console.error("Error al obtener productos:", err);
            } finally {
                setCargando(false);
            }
        };

        fetchProducts();
    }, [categoria, categorias]); // Añadido categorias como dependencia

    if (cargando) {
        return (
            <div style={{ 
                textAlign: 'center', 
                padding: '2rem',
                color: colors.text
            }}>
                Cargando productos...
            </div>
        );
    }

    return (
        <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
            gap: "2rem",
            padding: "1rem"
        }}>
            {productos.map((producto) => (
                <ProductCard 
                    key={producto.id} 
                    producto={producto} 
                    colors={colors} 
                />
            ))}
        </div>
    );
}