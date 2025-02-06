import { useState } from "react";
import { bringCharactersInLocationById } from "../../Services/apiCalls"; // Nueva función para obtener personajes por ID
import "./LocationCard.css";

//-------------------------------------------------------------------------

export const LocationCard = ({ location }) => {
  const [locationDetails, setLocationDetails] = useState([]); // Estado para los detalles de los personajes
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [showDetails, setShowDetails] = useState(false); // Estado para mostrar detalles

  // Función para obtener detalles adicionales de los personajes
  const fetchCharacters = async (id) => {
    try {
      setLoading(true);
      setError(null);

      // Obtener detalles de todos los personajes en la localización
      const characters = await bringCharactersInLocationById(id); // Llamamos a la API según el id
      setLocationDetails(characters); // Actualizamos el estado con los detalles obtenidos

    } catch (error) {
      setError("Error al obtener los personajes");
      console.error("Error al obtener los personajes:",err);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };
  

  // Cambia el estado de setShowDetails para mostrar u ocultar detalles
  const toggleDetails = async () => {
    if (!showDetails) {
      await fetchCharacters(location.id);
    }
    setShowDetails((prevState) => !prevState);
  };
  
  return (
    <div className="location-card">
      <h4>{location.name}</h4>
      <button className="toggle-details-button" onClick={toggleDetails}>
        {showDetails ? "Ocultar Detalles" : "Mostrar Detalles"}
      </button>
      {showDetails && (
        <div className="location-details">
          <h4>Habitantes de {location.name}</h4>
          {loading ? (
            <p>Cargando personajes...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <ul className="location-characters-list">
              {locationDetails.map((character) => (
                <li key={character.id}>
                  <img className="location-character-img"
                   src={character.image}
                   alt={character.name}/>
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
