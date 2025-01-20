import { bringCharactersById } from "../../Services/apiCalls";
import "./CharacterCard.css";

//----------------------------------------------------------------------------------------------

export const CharacterCard = ({ character, handlerClic, status }) => {

    const fetchCharacterDetails = async (id) => {
        try {
            const characterDetails = await bringCharactersById(id);
            console.log(characterDetails); // Log de los detalles del personaje
        } catch (error) {
            console.error("Error al obtener el personaje", error); 
        }
    };

    return (
        <div className="character-card">
            <img className="character-image" src={character.image} alt={character.name}/>
            <div className="character-info">
                <h4>{character.name}</h4>
                {status && <p>Sratus: {character.status}</p>}
                {/* {<h5>Specie: {character.species}</h5>} */}
                {/* <p>Origin: {bringCharactersById.origin.name}</p> */}
            </div>
        </div>
    )
}
