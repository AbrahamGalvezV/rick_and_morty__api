import { useEffect, useState } from "react";
import { bringAllLocations } from "../../Services/apiCalls";
import { LocationCard } from "../../Components/LocationCard/LocationCard";
import { Animation } from "../../Components/Animation/Animation";
import "./Locations.css";

//-------------------------------------------------------------------------

export const Locations = () => {
  const [locations, setLocations] = useState([]); // Estado vacío que contendrá un array con las localizaciones
  const [loading, setLoading] = useState(true); // Estado de carga iniciado con true
  const [error, setError] = useState(null); // Estado de error iniciado con null

  useEffect(() => {
    // Ejecuta una función cuando el componente está montado
    const fetchLocations = async () => {
      // Función asíncrona que obtiene las localizaciones de la API
      try {
        setLoading(true); // Activa el estado de carga
        const data = await bringAllLocations(); // Otorgamos los datos de la API a data
        setLocations(data); //todo Otorgamos el contenido de data al estado setLocatuons
      } catch (err) {
        setError("Error al obtener las localizaciones"); // Si ocurre un error, se guarda el mensaje en el estado 'setError'
      } finally {
        setLoading(false); // Desactiva el estado de carga
      }
    };
    fetchLocations(); // Llama a la función para ejecutarla inmediatamente cuando el componente se monta
  }, []); // La dependencia vacía para que useEffect se ejecute solo una vez

  return (
    // Clase dinamica, si setAnimate es true, se añade la clase animate con unos estilos diferentes
    <Animation>
      <h1 className="locations-design-title">Locations from Rick And Morty</h1>
      {/* Si setLoading es true, se muestra el mensaje */}
      {loading && <p>Cargando locations...</p>}
      {/* Si setError es true, se muestra el mensaje */}
      {error && <p>{error}</p>}
      <div className="locations-list">
        <ol>
          {/* Mapea el array 'locations' y genera 'locationCard' por cada localización */}
          {locations.map((locat) => {
            return (
              <LocationCard // Cada 'LoactionCard' recibe un objeto 'location' y usa 'id' como llave única
                key={locat.id} 
                location={locat}
              />
            );
          })}
        </ol>
      </div>
    </Animation>
  );
};
