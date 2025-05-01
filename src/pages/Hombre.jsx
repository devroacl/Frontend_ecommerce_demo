import React from "react";
import GridProducto from "../components/Producto/GridProducto";
import { useTheme } from "../context/themeContext";


export default function Hombre() {
    const { colors } = useTheme();

    return (
        <>  
        <section
            style={{
                backgroundColor: colors.background,
                minHeight: "80vh",
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
                    >Productos para él</h1>
                    <GridProducto categoria="hombre"/>
                </div>
        </section>
            
        </>
    )
}