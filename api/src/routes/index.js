const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogs = require("../controllers/getDogs");
const getDogsById = require("../controllers/getDogsById"); 
const getDogsByName = require("../controllers/getDogsByName"); 
const getTemperaments = require("../controllers/getTemperaments"); 
const postDogs = require("../controllers/postDogs"); 



const router = Router();

router.get("/dogs", (req, res) => {
    getDogs(req, res);
});

router.get("/dogs/:id", (req, res) => {
    getDogsById(req, res);
})

router.get("/dogs/name", (req, res) => {
    getDogsByName(req, res); 
})

router.post("/dogs", (req, res) => {
    postDogs(req, res);
});



module.exports = router;



