const URL = `https://api.thedogapi.com/v1/breeds`;
const axios = require("axios");
const { API_KEY } = process.env;
// Modelo de la DB para poder hacer el findAll (tabla perros)
const { Dog } = require("../db"); 

// Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.

const getDogs = async (req, res) => {
  try {
    // Obtengo la data proveniente de la api
    const { data: externalApiData } = await axios(URL, {
        params: { api_key: API_KEY }
    });

    // Obtengo la data proveniente de la base de datos
    const dbData = await Dog.findAll();

    // Uno las listas
    const data = [...dbData, ...externalApiData];

    return res.status(200).json(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = getDogs;
