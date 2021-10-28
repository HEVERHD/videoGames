const { Router } = require('express');
const { Videogame, Genre, videogames_genre } = require('../db.js');

const router = Router();

//Recibe la data colectada desde el formulario por el body
// Creo el videojuego en la db

router.post('/', async (req, res, next) => {
	const { name, description, image, released, rating, platforms, genres } =
		req.body;

	// let platformString = platforms.join(', ');

	let gameCreated = await Videogame.create({
		name: name,
		description: description,
		image: image,
		released: released,
		rating: rating,
		platforms: platforms,
	});

	genres.forEach(async (G) => {
		let genresGame = await Genre.findOne({ where: { name: G } });
		console.log(genresGame);
		await gameCreated.addGenre(genresGame.id);
	});
	res.send('Videogame created successfully!');
});

module.exports = router;
