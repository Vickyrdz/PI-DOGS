const URL = 'https://api.thedogapi.com/v1/breeds/';
const axios = require('axios');
const { Dog } = require("../db"); 

const getDogsById = async (req, res) => {
  try {
 
    const { id } = req.params;
    const { data: externalApiData } = await axios(URL, {
        params: { api_key: API_KEY }
    });

    // Obtengo la data proveniente de la base de datos
    const dbData = await Dog.findAll();

     // Uno las listas
    const data = [...dbData, ...externalApiData];

    const result =  data.find(dog => dog.id === parseInt(id))


    if(!data.name) throw new Error(`The data is insufficient for the dog with ID: ${id}`)
              const dog = {
                id: result.id,
                name: result.name,
                bred_for: result.bred_for,
                breed_group: result.breed_group, 
                life_span: result.life_span,
                temperament: result.temperament,
                origin: result.origin,
                reference_image_id: result.reference_image_id, 
                image: result.image,
              };

            return res.status(200).json(dog);
      
            } catch (error) {
                error.message.includes("ID")
                ? res.status(404).send(error.message)
                : res.status(500).send(error.response.data.error);
            }
};

module.exports = getDogsById; 





