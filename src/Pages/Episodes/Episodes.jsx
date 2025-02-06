import { useEffect, useState } from "react";
import { bringAllEpisodes } from "../../Services/apiCalls";
import { EpisodeCard } from "../../Components/EpisodeCard/EpisodeCard";
import "./Episodes.css";

export const Episodes = () => {
  const [episodes, setEpisodes] = useState([]); // Estado vacío que contendrá un array con los episodios obtenidos de la API
  const [loading, setLoading] = useState(true); // Estado de carga iniciado como true
  const [error, setError] = useState(null); // Estado de error iniciado como null
  const [animate, setAnimate] = useState(false); // Estado de la animación iniciado momo false

  useEffect(() => {
    // Ejecuta una función cuando el componente está montado
    const fetchEpisodes = async () => {
      // Función asíncrona que obtendrá laos episodios de la API
      try {
        setLoading(true); // Activa el estado de carga
        const data = await bringAllEpisodes(); // Otorga los datos obtenidos de la API a data
        setEpisodes(data); // Otorga el contenido de data a setEpisodes
      } catch (err) {
        setError("Error al obtener los datos"); // Si ocurre un error, guerda el mensaje de error en el estado 'setError'
      } finally {
        setLoading(false); // Desactiva el estado de carga
      }
    };
    fetchEpisodes(); // LLama a la funcuón para ejecutarla inmediatamente cuando el componente se monta
  }, []); // La dependencia vacía para que useEffect se ejecute solo una vez

  // Activa la animación cuando el componente se monta
  useEffect(() => {
    setAnimate(true);
  }, []); // Dependencia vacía para que useEffect se ejecute una sola vez

  return (
    // Clase dibamica, si setAnumate es true, se añaden una alcae con unos estilos diferentes
    <div className={`episodes-desing ${animate ? "animate" : ""}`}>
      <h1 className="episodes-design-title">Episodes of Rick And Morty</h1>
      {/* Si setLoading es true, se muestran los el mensaje */}
      {loading && <p>Cargando episodios...</p>}
      {/* Si setError es true, se muestran los el mensaje */}
      {error && <p>{error}</p>}
      <div className="episodes-list">
        <ol>
          {/* Mapea el array 'episodes' y genera 'EpisodeCard' por cada losalización */}
          {episodes.map((epis) => ( // Cada 'EpisodeCard' recibe un objeto 'location' y usa 'id' como llave única
            <EpisodeCard key={epis.id} episode={epis} />
          ))}
        </ol>
      </div>
    </div>
  );
};
