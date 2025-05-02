import React from "react";
import GridProducto from "../components/Producto/GridProducto";
import { useTheme } from "../context/themeContext";


export default function Tienda() {
    const { colors } = useTheme();

    return (
        <>  
        <section
            style={{
                backgroundColor: colors.background,
                display: "flex",
                flexDirection: "column"
            }}>

                <div
                    style={{
                        padding: "2rem",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column"
                    }}
                >   
                    <h1
                        style={{
                            color: colors.primary,
                            textAlign: "center",
                            marginBottom: "2rem"
                        }}
                    >Productos Destacados</h1>
                    <GridProducto categoria="destacados"/>
                </div>
        </section>
            
        </>
    )
}