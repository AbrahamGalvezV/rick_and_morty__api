import { useEffect, useState } from "react";
import { bringAllCharacters } from "../../Services/apiCalls"
import { CharacterCard } from "../../Components/Charactercard/CharacterCard";
import { Animation } from "../../Components/Animation/Animation";
import "./Characters.css"

//--------------------------------------------------------------------------------

export const Characters = () => {

    const [characters, setCharacters] = useState([]); // Estado para vacío que almacenará un array con los personajes
    const [loading, setLoading] = useState(false); // Estado de carga inicializado cono false
    const [error, setError] = useState(null); // Estado del error inicializado como null 
    
    useEffect(() => {
        // Se define una función asíncrona que obtendrá los datos de la API
        const fetchCharacters = async () => {
            try {
                setLoading(true); // Activa el estado de carga
                const data = await bringAllCharacters(); // Otorga los datos de la API a data
                setCharacters(data); // Otorgamos el contenido de data al estado serCharacters
            } catch {
                setError("Error al obtener los datos"); // Si ocurre un error, se guarda el mensaje en el estado 'setError'
            } finally {
                setLoading(false); // Desactiva el estado de carga
            }
        };
        fetchCharacters(); // Llama a la función para ejecutarla inmediatamente cuando el componente se monta
    }, []); // Dependencia vacía para que se ejecute solo una vez

    return (
        // Clase dinamica, si setAnimate es true, se añade la clase con unos estilos diferetes
        <Animation>
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
        </Animation>
    )
}

