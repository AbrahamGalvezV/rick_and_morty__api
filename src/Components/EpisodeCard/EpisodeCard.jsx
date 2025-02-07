import { useState } from "react";
import { bringCharactersInEpisodeById } from "../../Services/apiCalls";
import "./EpisodeCard.css";

//---------------------------------------------------------------------

export const EpisodeCard = ({ episode }) => {
  const [episodeDetails, setEpisodeDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Función para obtener los personajes de un episodio
  const fetchCharacters = async (id) => {
    try {
      setLoading(true);
      setError(null);

      // Obtener detalles de todos los personajes en el episodio
      const characterDetails = await bringCharactersInEpisodeById(id); // Llamamos a la API por la id del personaje        
      setEpisodeDetails(characterDetails); // Actualizamos el estado con los detalles obtenidos

    } catch (error) {
      setError("Error al obtener los personajes");
      console.error("Error al obtener los personajes:", err);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  // Cambia el estado de setShowDetails para mostrar u ocultar los detalles
  const toggleDetails = async () => {
    if (!showDetails) {
      await fetchCharacters(episode.id);
    }
    setShowDetails((prevState) => !prevState);
  };

  return (
    <div className="episode-card">
      <h4>{episode.name}</h4>
      <button className="toggle-details-button" onClick={toggleDetails}>
        {showDetails ? "Ocultar detalles" : "Mostrar detalles"}
      </button>
      {showDetails && (
        <div className="episode-details">
          <h4>Personajes en capítulo: {episode.name}</h4>
          {loading ? (
            <p>Cargando personajes...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <ul className="episode-characters-list">
              {episodeDetails.map((character) => (
                <li key={character.id}>
                  <img className="episode-characters-img"
                  src={character.image}
                  alt={character.name} />
                  <h5>{character.name}</h5>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
