import { useEffect, useState } from "react"
import "./Episodes.css"
import { EpisodesCard } from "../../Components/EpisodeCard/EpisodeCard";

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
                const data = await bringAllEpisodes(); // LLama a la API para obtener los personajes
                setCharacters(data); // Almacena los datos que contiene bringAllEpisodes
            } catch (err) {
                setError("Error al obtener los datos"); 
            } finally {
                setLoading(false); // Desaciva el estado de carga
            }
        };
        fetchEpisodes(); // Llama a la funcón cuando el componente se monta
    }, []); // Dependencia vacia para que se ejecute solo al montar




    return (
        <div className={`episodes-desing ${animate ? "animate" : ""}`}>
            <h1 className="episodes-design-title">Episodes of Rick And Morty</h1>
            {loading && <p>Carrgando episodios...</p>}
            {error && <p>{error}</p>}

            <div className="episode-list">
                <ol>
                    {episodes.map((epis) => {
                        return (
                            <EpisodesCard 
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