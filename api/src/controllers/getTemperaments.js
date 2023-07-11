const axios = require("axios"); 
const { Temperament } = require("../db"); 

const getAllTemps = async (req, res) => {
    try {
        const { data } = await axios("https://api.thedogapi.com/v1/breeds");

        data.forEach(dog => {
            if (dog.temperament) {
                let temps = dog.temperament.split(", "); 
                temps.forEach(dogTemps => {
                    //busca en el modelo el temperamento y sino lo crea y agrega
                    Temperament.findOrCreate({
                        where:  {name: dogTemps}
                    })
                });
            }
        });

        const foundTemps = await Temperament.findAll(); 
        
        return foundTemps.sort((a,b) => a.id - b.id) //se ordenan de forma ascendente 
        ? res.status(200).json(foundTemps)
        : res.status(400).send("Temperament not found"); 

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllTemps
}; 