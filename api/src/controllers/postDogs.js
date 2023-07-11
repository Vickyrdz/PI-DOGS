const { Dog, Temperament } = require("../db"); 

const postDogs = async (req, res) => {

    const { name, height, weight, life_span, temperaments, image } = req.body;

    try {
 
        //VALIDACIONES: 
        const foundbd = await Dog.findOne({where: { name }}); 
        console.log({ foundbd });
        if(foundbd) return res.status(400).send("There is already a dog with that name"); 
        //crear
        const newDog = await Dog.create({
            name: name, 
            height: height, 
            weight: weight,
            life_span: life_span, 
            temperaments: temperaments,
            image: image,
        })
 
        //guardar sin repetir los temperamentos 
        const foundTemp = Array.from(new Set(temperaments)) //clase de js 


        const dogsTemp = []; 


        foundTemp.forEach( async nameTemp => {
            //ver si ya existe
            let temperament = await Temperament.findOne({ where: { name: nameTemp}})

            //si no existe lo crea
            if(!temperament){
                temperament = await Temperament.create({ 
                    name: nameTemp, 
            })
            }; 

            dogsTemp.push(temperament); 
        });
       

        await newDog.addTemperaments(dogsTemp); 


        return res.status(200).json(newDog);

      } catch (error) {
        return res.status(500).send(error.message);
      }
}

module.exports = postDogs; 
