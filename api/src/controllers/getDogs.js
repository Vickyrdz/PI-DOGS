const URL = `https://api.thedogapi.com/v1/breeds`;
const axios = require("axios");
const { API_KEY } = process.env;
// Modelo de la DB para poder hacer el findAll (tabla perros)
const { Dog, Temperament } = require("../db"); 

// Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.

const getDogs = async (req, res) => {
  try {
    // Obtengo la data proveniente de la api
    const { data: externalApiData } = await axios(URL, {
        params: { api_key: API_KEY }
    });

    // Obtengo la data proveniente de la base de datos
    let dbData = await Dog.findAll({
      include: Temperament
    });
    
    dbData = dbData.map((dog) => {
      // convierto el modelo que encontré a JSON para poder manipularlo porque sinó tira error al modificar propiedades
      // agarro los temperamentos y dejo el resto de las propiedades en el spread llamado rest
      const { Temperaments, ...rest } = dog.toJSON();
      // armo el resultado con los datos del rest
      // aplico formato a los temperamentos para que sea un string unido por ',' al igual que el de la API
      return ({
        ...rest,
        source: 'DB',
        temperament: Temperaments.map((temp) => temp.name).join(', '),
      });
    });

    
    // Uno las listas
    const data = [
      ...dbData,
      ...externalApiData
    ];

    return res.status(200).json(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = getDogs;
