const URL = 'https://api.thedogapi.com/v1/breeds/search';
const axios = require('axios');
const { Dog } = require("../db"); 
const { API_KEY } = process.env;

const getDogsByName = async (req, res) => {
  try {
    const { name } = req.query;

    const { data: externalApiData } = await axios(URL, {
        params: { api_key: API_KEY, q: name },
    });

    let dbData = await Dog.findAll();
    dbData = dbData.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase())).map((dog) => {
      return ({
        ...dog.toJSON(),
        source: 'DB'
      })
    });

    const data = [...dbData, ...externalApiData];

    if(!data.length) throw new Error(`There are no results with name ${name}`)

    return res.status(200).json(data);
    } catch (error) {
      res.status(404).send(error.message)
    }
};

module.exports = getDogsByName; 





