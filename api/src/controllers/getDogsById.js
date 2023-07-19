const URL = 'https://api.thedogapi.com/v1/breeds/';
const axios = require('axios');
const { Dog, Temperament, DogTemperament } = require("../db"); 
const { API_KEY } = process.env;

const getDogsById = async (req, res) => {
  try {
    // obtengo el ID que vino por parámetro que está definido en routes/index.js l:18
    const { id } = req.params;

    // declaro la variable donde vamos a retornar el resultado
    let result;

    /*
      si el ID es un string de 36 caracteres pertenece a mi base de datos, 
      de lo contrario debo buscarlo en los datos de la api de Dogs
     */

    const isDbDog = id.toString().length === 36 // es UUID

    if (isDbDog) {
      // busco el perro con el id que me llega
      result = await Dog.findOne({
        where: {
          id,
        },
        // incluyo los temperamentos asociados al perro
        include: Temperament
      });

      // convierto el modelo que encontré a JSON para poder manipularlo porque sinó tira error al modificar propiedades
      // agarro los temperamentos y dejo el resto de las propiedades en el spread llamado rest
      const { Temperaments, ...rest } = result.toJSON();

      // armo el resultado con los datos del rest
      // aplico formato a los temperamentos para que sea un string unido por ',' al igual que el de la API
      result = {
        ...rest,
        temperament: Temperaments.map((temp) => temp.name).join(', '),
      }
    } else {
      const { data: externalApiData } = await axios(`${URL}`, {
        params: { api_key: API_KEY }
      });
      // busco el perro que tenga el id que recibí por parametro en la lista completa
      // ya que en el readme decía que no podíamos utilizar el endpoint de búsqueda por id
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





