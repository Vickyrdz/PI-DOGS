const URL = 'https://api.thedogapi.com/v1/breeds/search/';
const axios = require('axios');
const { Op } = require('sequelize');
const { Dog } = require("../db"); 

const getDogsByName = async (req, res) => {
  try {
    const { name } = req.query; 

    const { data: externalApiData } = await axios(URL, {
        params: { api_key: API_KEY },
        q: name,
    });

    let dbData = await Dog.findAll();
    dbData = dbData.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));

    const data = [...dbData, ...externalApiData];

    if(!data.name) throw new Error(`The breed ${name} not exist`)

            return res.status(200).json(data);
      
            } catch (error) {
             res.status(404).send(error.message)
            }
};

module.exports = getDogsByName; 





