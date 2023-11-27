// Axios Start Here
const axios = require("axios");

const pokemonAPI = axios.create({
    baseURL: "https://pokeapi.co/api/v2/pokemon",
});


module.exports = { pokemonAPI }