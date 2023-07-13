const URL = 'https://api.thedogapi.com/v1/breeds/';
const axios = require('axios');
const { Dog } = require("../db"); 
const { API_KEY } = process.env;

const getDogsById = async (req, res) => {
  try {
    // obtengo el ID que vino por parámetro que está definido en routes/index.js l:18
    const { id } = req.params;

    // declaro la variable donde vamos a retornar el resultado
    let result;

    /*
      si el ID se puede convertir a entero, 
      debo buscarlo en los datos de la api de Dogs
      ya que los ID de los perros de la Base de Datos no cumplen esa condición
     */

    const isDbDog = Number.isNaN(parseInt(id)); // es UUID

    if (isDbDog) {
      const dbData = await Dog.findAll();
      result = dbData.find((dog) => dog.id.toString() === id.toString());
    } else {
      const { data: externalApiData } = await axios(URL, {
        params: { api_key: API_KEY }
      });
      result = externalApiData.find((dog) => dog.id.toString() === id.toString());
    }

    // si lo encuentro, lo retorno, sino envío un NOT FOUND
    if (result) res.status(200).json(result);
    else throw new Error('NOT FOUND')
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = getDogsById; 





