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
  const fetchCharacters = async (characterUrls) => {
    if (!Array.isArray(characterUrls)) {
      setError("Error: La lista de personajes no es válida.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Obtener detalles de todos los personajes
      const characterDetails = await Promise.all(
        characterUrls.map((url) => bringCharactersInEpisodeById(url))
      );

      setEpisodeDetails(characterDetails);
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
      await fetchCharacters(episode.characters);
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
          <h4>Personajes en el capítulo</h4>
          {loading ? (
            <p>Cargando personajes...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <ul>
              {episodeDetails.map((character) => (
                <li key={character.id}>
                  {character.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
