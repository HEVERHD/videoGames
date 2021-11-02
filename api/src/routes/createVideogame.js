const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');

const router = Router();

//Recibe la data colectada desde el formulario por el body
// Creo el videojuego en la db

router.post('/', async (req, res) => {
  const { name, description, image, released, rating, platforms, genres } = req.body;

  let platformString = platforms.join(', ')

  let gameCreated = await Videogame.create({
    name,
    description,
    image, 
    released,
    rating,
    platforms: platformString,
  })

  genres.forEach(async (G) => {
      let genresGame = await Genre.findOne({ where: { name: G } })
      await gameCreated.addGenre(genresGame)
  })
    res.send('Videogame created successfully!')
});

module.exports = router;