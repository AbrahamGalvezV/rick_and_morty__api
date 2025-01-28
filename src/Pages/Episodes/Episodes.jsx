import { useEffect, useState } from "react"
import { bringAllEpisodes } from "../../Services/apiCalls";
import { EpisodeCard } from "../../Components/EpisodeCard/EpisodeCard";
import "./Episodes.css"

//--------------------------------------------------------------------------

export const Episodes = () => {

    const [episodes, setEpidodes] = useState([]); // Estado para almacenar los episodios
    const [loading, setLoading] = useState([true]); // estado para cargar inicializado con true
    const [error, setError] = useState([null]); // Estado de error inicializado con null
    const [animate, setAnimate] = useState([false]); // El estado de la animación es false

    useEffect(() => {
        // Hook para obtener los episodios al cargar la el componente
        const fetchEpisodes = async () => {
            try {
                setLoading(true); // Activa el estado de carga
                const data = await bringAllEpisodes();             
                // console.log(data);
                // LLama a la API para obtener los personajes
                setEpidodes(data); // Almacena los datos que contiene bringAllEpisodes
            } catch (err) {
                setError("Error al obtener los datos"); 
            } finally {
                setLoading(false); // Desaciva el estado de carga
            }
        };
        fetchEpisodes(); // Llama a la funcón cuando el componente se monta
    }, []); // Dependencia vacia para que se ejecute solo al montar

    // Maneja la animación al cargar el componente
    useEffect (() => {
        setAnimate(true); // Activa la clase de animación
    }, []); // Dependencia vacía para que se ejecute solo al mostrar


    return (
        <div className={`episodes-desing ${animate ? "animate" : ""}`}>

            <h1 className="episodes-design-title">Episodes of Rick And Morty</h1>
            {loading && <p>Carrgando episodios...</p>}
            {error && <p>{error}</p>}

            <div className="episodes-list">
                <ol>
                    {episodes.map((epis) => {
                        return (
                            <EpisodeCard 
                                key={epis.id}
                                episode={epis}
                            />
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}