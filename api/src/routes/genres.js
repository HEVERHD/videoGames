require("dotenv").config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Genre } = require('../db.js');

const router = Router();

// Obtengo los genres desde la API y los guardo en la DB

router.get('/', async function (req, res) {
    try{
        const genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        genresAPI.data.results.forEach(p => {
            Genre.findOrCreate({
                where: { name: p.name }
            })
        })
        const genresDB = await Genre.findAll()
        res.json(genresDB)
    } catch (err) {
        res.status(404).json({ err })
    }
})


module.exports = router;