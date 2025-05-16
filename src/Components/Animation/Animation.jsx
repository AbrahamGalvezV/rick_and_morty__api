import { useEffect, useState } from "react";
import "./Animation.css"

export const Animation = ({ children, className }) => {

    const [animate, setAnimate] = useState(false); // Estado para manejar la animación
    
        // Activa la animación cuando el componente se monta
        useEffect(() => {
            setAnimate(true);
        }, []); // Dependencia vacía para ejecutar el efecto solo al montar al componente

    return (
        <div className={`characters-desing ${animate ? "animate" : ""} ${className}`}>
            {children}
        </div>
    )
}