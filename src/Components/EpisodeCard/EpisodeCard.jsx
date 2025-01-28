import { useState } from "react";
import {
  bringCharactersInEpisodeById,
  bringEpisodesById,
} from "../../Services/apiCalls";
import "./EpisodeCard.css";

//---------------------------------------------------------------

export const EpisodeCard = ({ episode }) => {
  const [episodeDetails, setEpisodeDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Función para obtener los personajes de un episodio
  const fetchCharacters = async (characterUrls) => {
    try {
      setLoading(true);
      setError(null);

      // Traemos los detalles de todos los personajes usando Promise.all
      const characterDetails = await Promise.all(
        characterUrls.map((url) => bringCharactersInEpisodeById(url))
      );

      setEpisodeDetails(characterDetails); // Guardamos los detalles de los personajes
    } catch (err) {
      setError("Error al obtener los personajes");
      console.error("Error al obtener los personajes:", err);
    } finally {
      setLoading(false);
    }
  };

  // Alternar visibilidad de detalles
  const toggleDetails = async () => {
    if (!showDetails) {
      await bringCharactersInEpisodeById(episode.characters); // Llamamos a la función para obtener los personajes
    }
    setShowDetails((prevState) => !prevState); // Cambiamos el estado de visibilidad
  };

  return (
    <div className="episode-card">
      <h4>{episode.name}</h4>
      <button className="toggle-details-button" onClick={toggleDetails}>
        {showDetails ? "Ocultar detalles" : "Mostrar detalles"}
      </button>
      {showDetails && (
        <div className="episode-details">
          <h4>Personajes en el capítulo</h4>
          {loading ? (
            <p>Cargando personajes...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <ul>
              {episodeDetails.map((character, index) => (
                <li key={index}>{character.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
