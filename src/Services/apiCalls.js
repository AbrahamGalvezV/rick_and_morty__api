import axios from "axios";

//---------------------------------------------------------------

// Creación de diferentes entradas con el mismo nombre para favorecer un entorno de dearrollo
const API_URL = "https://rickandmortyapi.com/api"
// const API_URL = "http://localhost:4000";
// const API_URL = "Aquí una url para entornos de desarrollo";

export const bringAllCharacters = async () => {
    const res = await axios.get(`${API_URL}/character`) // Endpoint bringAllCharacters
    return res.data.results // Devuelve los personajes
}

export const bringCharacterById = async (id) => {
    const res = await axios.get(`${API_URL}/character/${id}`) // Endpoint bringCharactersById
    return res.data // Devuelve los personajes según el id
}

export const bringAllEpisodes = async () => {
    const res = await axios.get(`${API_URL}/episode`,) // Endpoint bringAllEpisodes
    return res.data.results // Devuelve los episodios
}

export const bringEpisodesById = async (id) => {
    const res = await axios.get(`${API_URL}/episode/${id}`)// Endpoint bringEpisodesById
    return res.data // Devuelve los episodios según el id
}

export const bringCharactersInEpisodeById = async (id) => {
    try {
        // Obtenemos la información del episodio
        const response = await axios.get(`${API_URL}/episode/${id}`);
        const episodeData = response.data;

        // Extraemos las URLS de los personajes desde
        const characterUrls = episodeData.characters;

        // Llamada a la API para obtener la información de cada personaje
        const characters = await Promise.all(
            characterUrls.map(async (url) => {
                const characterRes = await axios.get(url);
                return characterRes.data;
            })
        );
        return characters; // Retornamos los personajes
    } catch (err) {
        console.error("Error al obtener personaje:", err);
        throw err;
    }
};


export const bringAllLocations = async (id) => {
    const results = await axios.get(`${API_URL}/location`)
    return results.data.results
}

export const bringCharactersInLocationById = async (id) => {
    try {
        // Obtenemos la información de la ubicación
        const response = await axios.get(`${API_URL}/location/${id}`);
        const locationData = response.data;

        // Extracción de las URLs de los personajes desde `residents`
        const characterUrls = locationData.residents;

        // Llamamos a la API para obtener la info de cada personaje
        const characters = await Promise.all(
            characterUrls.map(async (url) => {
                const characterRes = await axios.get(url);
                return characterRes.data;
            })
        );

        return characters; // Retornamos solo los personajes, no toda la localización
    } catch (err) {
        console.error("Error al obtener los personajes:", err);
        throw err;
    }
};

