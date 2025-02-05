import { useEffect, useState } from "react";
import { bringAllLocations } from "../../Services/apiCalls";
import { LocationCard } from "../../Components/LocationCard/LocationCard";
import "./Locations.css";

//-------------------------------------------------------------------------

export const Locations = () => {
  const [locations, setLocations] = useState([]); // Otorga el contenido de al estado setLocations
  const [loading, setLoading] = useState(true); // Estado de carga iniciado con true
  const [error, setError] = useState(null); // Estado de error iniciado con null
  const [animate, setAnimate] = useState(false);// Estado de la animación iniciado con false

  useEffect(() => {  // Ejecuta una función cuando el componente esta montado
    const fetchLocations = async () => { // Función asíncrona que obtiene las localizaciones de la API
      try {
        setLoading(true); // Cambiamos el estado de setLoading a true
        const data = await bringAllLocations(); // Otorgamos los datos de la API a data 
        setLocations(data); //todo Otorgamos el contenido de data al estado setLocatuons
      } catch (err) { 
        setError("Error al obtener las localizaciones"); // Si ocurre un error, se guarda el mensaje en el estado 'error'
      } finally {
        setLoading(false); // Desactiva el estado de carga 
      }
    };
    fetchLocations(); // Se llama a la función para ejecutarla inmediatamente cuando el componente se monte
  }, []); // La dependencia vacía para que useEffect se ejecute solo una vez

  // Activa la animación cuando el componente se monta
  useEffect(() => {
    setAnimate(true);
  }, []); // Dependecia vacía para que ejecutar el efecto solo al montar el componente

  return (
    // Clase dinamica, si setAnimate es true, se añade la clase animate con unos estilos diferentes
    <div className={`locations-design ${animate ? "animate" : ""}`}> 
      <h1 className="locations-design-title">Locations from Rick And Morty</h1>
      {/* Si setLoading es true, se muestra el mensaje */}
      {loading && <p>Cargando locations...</p>}
      {/* Si setError es true, se muestra el mensaje */}
      {error && <p>{error}</p>}
      <div className="locations-list">
        <ol>
            {/* Mapea el array 'locations' y genera 'locationCard' por cada localización */}
          {locations.map((locat) => (
            // Cada 'LoactionCard' recibe un objeto 'location' y usa 'id' como llave única
            <LocationCard key={locat.id} location={locat}/>
          ))}
        </ol>
      </div>
    </div>
  );
};
