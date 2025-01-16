import "./CharacterCard.css ";
export const CharacterCard = ({ character, handlerClic, status }) => {

    return (
        <div className="character-card">
            <img className="character-image" src={CharacterCard.image} alt={character.name}/>
            <div className="character-info">
                <h4>{character.name}</h4>
                {status && <p>Sratus: {character.status}</p>}
                {<h5>Specie: {character.species}</h5>}
                <p>Origin: {bringCharactersById.origin.name}</p>
            </div>
        </div>
    )
}
