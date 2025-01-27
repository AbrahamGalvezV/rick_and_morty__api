import { useState } from "react";
import { bringEpisodesById } from "../../Services/apiCalls";
import "./EpisodeCard.css";

//---------------------------------------------------------------

export const EpisodeCard = ({ episode }) => {
    
    // Establecemos un estado para guardar los detalles adicionales 
    const [episodeDetails, setEpisodeDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    // Función para obtener detalles del personaje
    const fetchEpisodesDetails = async (id) => {
        try {
            setLoading(true);
            setError(null); // Reinicia el error antes de intentar una nueva solicitud
            const details = await bringEpisodesById(id); // Llamada a la API
            setEpisodeDetails(details);
        } catch {
            setError("Error al obtener el episodio:", err);
            console.error("Error al obtener el episodio", err);
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

// Alerta entre ocultar y mostrar detalles
    // const toggleDetails = async () => {
    //     if (!showDetails) {
    //         // Si los detalles no están visibles, obtén los detalles del episodio
    //         await fetchEpisodesDetails(episode.id); // Llama a la Api para obtener los detalles
    //     }
    //     setShowDetails((prevState) => !prevState); // Almacena el estado de visivilidad 
    // };


    return (

        <div className="episode-card" >
            <h4>{episode.name}</h4>
        </div>
    )
}