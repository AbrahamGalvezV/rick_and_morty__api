import axios from "axios";

//---------------------------------------------------------------

// Creación de diferentes entradas con el mismo nombre para favorecer un entorno de dearrollo
const API_URL = "https://rickandmortyapi.com/api"
// const API_URL = "http://localhost:4000";
// const API_URL = "Aquí una url para entornos de desarrollo";

export const bringAllCharacters = async () => {
    const res = await axios.get(`${API_URL}/character`, /*headers*/) // Endpoint
    return res.data.results // Devuelve los personajes
}

export const bringCharactersById = async (id) => {
    const res = await axios.get(`${API_URL}/character/${id}`) // Endpoint
    return res.data // Devuelve los personajes
}
