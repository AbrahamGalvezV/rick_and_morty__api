import { useEffect, useState } from "react";
import { bringAllCharacters, bringCharactersById } from "../../Services/apiCalls"
import { CharacterCard } from "../../Components/Charactercard/CharacterCard";
import "./Characters.css"

//--------------------------------------------------------------------------------

export const Characters = () => {

    const [characters, setCharacters] = useState([]); // Estado para almacenar los personajes
    const [loading, setLoading] = useState(true); // Estado de carga inicializado cono true
    const [error, setError] = useState(null); // Estado del error inicializado como null
    const [animate, setAnimate] = useState(false); // Estado para manejar la animacuón
    
    useEffect(() => {
        // Hook para obtener personajes al cargar el componente
        const fetchCharacters = async () => {
            try {
                setLoading(true); // Activa el estado de carga
                const data = await bringAllCharacters(); // Llama a la API para obtener los personajes
                setCharacters(data); // Almacena los dos data que contiene bringAllCharacters()
            } catch (err) {
                setError("Error al obtener los datos"); // Establece el mensaje de error en caso de fallo
            } finally {
                setLoading(false); // Desactiva el estado de carga
            }
        };
        fetchCharacters(); // Llama a la función cuando el componente se monta
    }, []); // Dependencia vacía para que se ejecute solo al montar
    
    // useEffect Para manejar la animacion al cargar el componente 
    useEffect(() => {
        setAnimate(true); // Activa la clase de animación
    }, []); // Dependencia vacía para que se ejecute solo al montar

    return (
        <div className={`characters-desing ${animate ? "animate" : ""}`}>
            <h1 className="characters-design-title">Rick And Morty</h1>

            {/* Muestra un mensaje de carga o error si es necesario */}
            {loading && <p>Cargando personajes...</p>}
            {error && <p>{error}</p>}

            {/* Lista de personaje */}
            <div className="characters-list">
                <ol>
                    {characters.map((char) => {
                        return (
                            <CharacterCard
                                key={char.id} // Agrefa `key` único para cada personaje
                                character={char} // Pasa el personaje como prop
                            />
                        );
                    })}
                </ol>
            </div>
        </div>
    )
}

