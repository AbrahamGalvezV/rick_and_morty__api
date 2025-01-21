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

  // Muestra la información al hacer clic en la tarjeta
  const handleCardClick = () => {
      if (setShowDetails === (true)) {
        fetchCharacterDetails(character.id); // Obtener los detalles del personaje    
    } else {
        
    }
  };

  return (
    <div className="character-card" onClick={handleCardClick}>
      {" "}
      {/*Maneja el clic directamente en la tarjeta */}
      {/* Imagen y nombre del personaje */}
      <img
        className="character-image"
        src={character.image}
        alt={character.name}
      />
      <div className="character-info">
        <h4>{character.name}</h4>
        {status && <p>Specie: {character.species}</p>}
        {status && <p>Sratus: {character.status}</p>}

        {/* Mostrar detalles adicionales si están disponibles */}
        {loading && <p className="loading-message">Cargando detalles...</p>}
        {error && <p className="error-message">{error}</p>}
        {characterDetails && (
          <div className="additional-info">
            <p>Status: {character.status}</p>
            <p>Specie: {character.species}</p>
            <p>Origen: {character.origin?.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};
