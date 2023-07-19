const axios = require("axios"); 
const { Temperament } = require("../db"); 
const { API_KEY } = process.env;

const getAllTemps = async (req, res) => {
    try {
        // todos los perros de la API
        const { data } = await axios("https://api.thedogapi.com/v1/breeds", {
            params: { api_key: API_KEY }
        });

        // de cada uno agarro el temperamento y lo separo por ','
        // con esa lista de temperamentos separados veo si ya lo guardé en mi BD
        // si no, lo creo para tenerlo guardado para próximas búsquedas
        data.forEach(dog => {
            if (dog.temperament) {
                let temps = dog.temperament.split(","); 
                temps.forEach(dogTemps => {
                    //busca en el modelo el temperamento y sino lo crea y agrega
                    Temperament.findOrCreate({
                        where:  {name: dogTemps}
                    })
                });
            }
        });

        // busco los de la BD
        const foundTemps = await Temperament.findAll(); 
        
        const sortedFoundTemps = foundTemps.sort((a,b) => a.id - b.id) //se ordenan de forma ascendente 
        return res.status(200).json(sortedFoundTemps);

    } catch (error) {
        res.status(500).send(error.message);
    }  
}

module.exports = getAllTemps; 