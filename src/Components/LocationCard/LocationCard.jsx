import { useState } from "react";
import { bringCharactersInLocationById } from "../../Services/apiCalls";

export const LocationCard = ({ location }) => {
  const [locationDetails, setLocationDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      setError(null);
      const details = await Promise.all(
        location.residents.map((url) => bringCharactersInLocationById(url))
      );
      setLocationDetails(details);
    } catch (err) {
      setError("Error al obtener los detalles");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDetails = async () => {
    if (!showDetails) {
      await fetchLocations();
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
          <h4>Ubicaciones en el capítulo</h4>
          {loading ? (
            <p>Cargando ubicaciones...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <ul>
              {locationDetails.map((loc, index) => (
                <li key={index}>{loc.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
