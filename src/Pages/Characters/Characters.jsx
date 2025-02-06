import { useEffect, useState } from "react";
import { bringAllCharacters, bringCharacterById } from "../../Services/apiCalls"
import { CharacterCard } from "../../Components/Charactercard/CharacterCard";
import "./Characters.css"

//--------------------------------------------------------------------------------

export const Characters = () => {

    const [characters, setCharacters] = useState([]); // Estado para vacío que almacenará un array con los personajes
    const [loading, setLoading] = useState(true); // Estado de carga inicializado cono true
    const [error, setError] = useState(null); // Estado del error inicializado como null
    const [animate, setAnimate] = useState(false); // Estado para manejar la animación
    
    useEffect(() => {
        // Se define una función asíncrona que obtendrá los datos de la API
        const fetchCharacters = async () => {
            try {
                setLoading(true); // Activa el estado de carga
                const data = await bringAllCharacters(); // Otorga los datos de la API a data
                setCharacters(data); // Otorgamos el contenido de data al estado serCharacters
            } catch (err) {
                setError("Error al obtener los datos"); // Si ocurre un error, se guarda el mensaje en el estado 'setError'
            } finally {
                setLoading(false); // Desactiva el estado de carga
            }
        };
        fetchCharacters(); // Llama a la función para ejecutarla inmediatamente cuando el componente se monta
    }, []); // Dependencia vacía para que se ejecute solo una vez
    
    // Activa la animación cuando el componente se monta
    useEffect(() => {
        setAnimate(true);
    }, []); // Dependencia vacía para ejecutar el efecto solo al montar al componente

    return (
        // Clase dinamica, si setAnimate es true, se añade la clase con unos estilos deiferetes
        <div className={`characters-desing ${animate ? "animate" : ""}`}>
            <h1 className="characters-design-title">Rick And Morty</h1>
            {/* Muestra un mensaje de carga o error si es necesario */}
            {loading && <p>Cargando personajes...</p>}
            {error && <p>{error}</p>}
            <div className="characters-list">
                <ol>
                    {/* Mapea el array 'characters' y genera 'CharacterCard' por cada personaje */}
                    {characters.map((char) => {
                        return (
                            <CharacterCard // Cada 'CharacterCard' recibe un objeto 'Character' y usa 'id' como llave única
                                key={char.id} 
                                character={char} 
                            />
                        );
                    })}
                </ol>
            </div>
        </div>
    )
}

