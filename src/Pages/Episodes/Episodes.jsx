import { useEffect, useState } from "react";
import { bringAllEpisodes } from "../../Services/apiCalls";
import { EpisodeCard } from "../../Components/EpisodeCard/EpisodeCard";
import "./Episodes.css";

export const Episodes = () => {
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                setLoading(true);
                const data = await bringAllEpisodes();             
                setEpisodes(data);
            } catch (err) {
                setError("Error al obtener los datos"); 
            } finally {
                setLoading(false);
            }
        };
        fetchEpisodes();
    }, []);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <div className={`episodes-desing ${animate ? "animate" : ""}`}>
            <h1 className="episodes-design-title">Episodes of Rick And Morty</h1>
            {loading && <p>Cargando episodios...</p>}
            {error && <p>{error}</p>}

            <div className="episodes-list">
                <ol>
                    {episodes.map((epis) => (
                        <EpisodeCard key={epis.id} episode={epis} />
                    ))}
                </ol>
            </div>
        </div>
    );
};
