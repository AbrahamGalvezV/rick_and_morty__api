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

export const bringCharactersInEpisodeById = async (url) => {
    try {
        const response = await axios.get(url); // Solicitud para una sola URL
        return response.data; // Retorna los datos del personaje
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
        // Primero obtenemos la información de la ubicación
        const response = await axios.get(`${API_URL}/location/${id}`);
        const locationData = response.data;

        // Extraemos las URLs de los personajes desde `residents`
        const characterUrls = locationData.residents;

        // Hacemos las llamadas a la API para obtener la info de cada personaje
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

