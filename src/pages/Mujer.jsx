import React from "react";
import GridProducto from "../components/Producto/GridProducto";
import { useTheme } from "../context/themeContext";


export default function Mujer() {
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
                    >Productos para ella</h1>
                    <GridProducto categoria="mujer"/>
                </div>
        </section>
            
        </>
    )
}