const { Dog, Temperament, DogTemperament } = require("../db"); 

const postDogs = async (req, res) => {

    const { name, height, min_weight, max_weight, life_span, temperaments, image } = req.body;

    try {
 
        //VALIDACIONES: 
        const foundbd = await Dog.findOne({ where: { name }}); 

        if (foundbd) return res.status(400).send("There is already a dog with that name"); 
        //crear
        const newDog = await Dog.create({
            name: name, 
            height: height, 
            weight: `${min_weight} - ${max_weight}`,
            life_span: life_span,
            image: image,
        });
 
        // recibo un string separado por comas y lo convierto en un array de palabras con la primer letra mayúscula
        const temperamentsArray = temperaments
            // lo separo
            .split(',')
            .map((temperament) => {
                // borro espacio que puede haber y lo dejo en minúscula
                const lowercase = temperament.trim().toLowerCase();
                // formateo con la primer letra en mayúscula -- (amigable --> Amigable)
                return `${lowercase[0].toUpperCase()}${lowercase.substring(1)}`;
            });

        // guardar sin repetir los temperamentos 
        const foundTemp = Array.from(new Set(temperamentsArray)) //clase de js 

        const dogsTemp = []; 

        // recorro la lista de temperamentos sin repetidos
        for (const nameTemp of foundTemp) {
            //veo si ya existe
            let temperament = await Temperament.findOne({ where: { name: nameTemp }})

            // si no existe lo creo
            if(!temperament){
                temperament = await Temperament.create({ 
                    name: nameTemp, 
                });
            };

            // guardo los temperamentos sin importar si los cree en este momento o los encontré ya creados
            dogsTemp.push(temperament); 
        }

        for (const dbTemp of dogsTemp) {
            // defino como crear la relación entre temperamento y perro
            const createDogTemperamentRelation = async () => {
                await DogTemperament.create({
                    DogId: newDog.id,
                    TemperamentId: dbTemp.id,
                });
            };
            // ejecuto la función que crea la relación
            createDogTemperamentRelation();
        }

        return res.status(200).json(newDog);

      } catch (error) {
        return res.status(500).send(error.message);
      }
}

module.exports = postDogs; 
