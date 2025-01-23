import { bringCharactersById } from "../../Services/apiCalls";
import { useState } from "react";
import "./CharacterCard.css";

//----------------------------------------------------------------------------------------------

export const CharacterCard = ({ character, status }) => {
  // Estado para guardar los detalles adicionales del personaje
  const [characterDetails, setCharacterDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Función para obtener detalles adicionales del personaje
  const fetchCharacterDetails = async (id) => {
    try {
      setLoading(true);
      setError(null); // Reincia el error antes de intentar una nueva solicitud
      const details = await bringCharactersById(id); // Llamada a la API
      setCharacterDetails(details); // Actualiza el estado con los detalles obtenidos
    } catch (error) {
      setError("Error al obtener el personaje");
      console.error("Error al obtener el personaje:", err);
    } finally {
      setLoading(false); // Finañiza el estado de carga
    }
  };

  // Alternar entre mostrar y ocultar detalles
  const toggleDetails = async () => {
    if (!showDetails) {
        // Si los detalles no están visibles, obtén los detalles del personaje
        await fetchCharacterDetails(character.id); // Llamar a la API Para obtener los detalles
    }
      setShowDetails((prevState) => !prevState); // Almacena el esrado de visivilidad 
  };

  return (
    <div className="character-card" onClick={toggleDetails}>
    {/* Imagen y nombre del personaje */}
    <img
      className="character-image"
      src={character.image}
      alt={character.name}
    />
    <div className="character-info">
      <h4>{character.name}</h4>
      {status && <p>Specie: {character.species}</p>}
      {status && <p>Status: {character.status}</p>}

      {/* Mostrar detalles adicionales si están disponibles */}
      {showDetails && (
        <div className="additional-info">
          {loading && <p className="loading-message">Cargando detalles...</p>}
          {error && <p className="error-message">{error}</p>}
          {characterDetails && (
            <div className="details-content">

              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
  );
};
