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

export const bringCharactersById = async (id) => {
    const res = await axios.get(`${API_URL}/character/${id}`) // Endpoint bringCharactersById
    return res.data // Devuelve los personajes según el id
}

export const bringAllEpisodes = async (id) => {
    const res = await axios.get(`${API_URL}/episode`,) // Endpoint bringAllEpisodes
    return res.data.results // Devuelve los episodios
}

export const bringEpisodesById = async (id) => {
    const res = await axios.get(`${API_URL}/episode/${id}`)// Endpoint bringEpisodesById
    return res.data // Devuelve los episodios según el id
}

// export const bringCharactersInEpisodeById = async (id) => {
//     const res = await axios.get(`${API_URL}/episode/${id}`) // Endpoint bringCharactersInEpisodeById
//     return res.data.characters 
// }

export const bringCharactersInEpisodeById = async (url) => {
    try {
        const response = await axios.get(url); // Solicitud para una sola URL
        return response.data; // Retorna los datos del personaje
    } catch (err) {
        console.error("Error al obtener personaje:", err);
        throw err;
    }
};



// console.log(bringCharactersInEpisodeById(1));

