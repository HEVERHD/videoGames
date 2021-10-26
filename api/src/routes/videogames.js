const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const { Genre, Videogame, videogame_genre } = require('../db');
const { v4: uuidv4 } = require('uuid');

// GET https://api.rawg.io/api/games
const getApiInfo = async () => {
	let gamesPageOne = axios.get(
		`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
	);

	let gamesPageTwo = axios.get(
		`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=2`
	);

	let gamesPageThree = axios.get(
		`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=3`
	);

	let gamesPageFour = axios.get(
		`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=4`
	);

	let gamesPageFive = axios.get(
		`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=5`
	);

	let date = await Promise.all([
		gamesPageOne,
		gamesPageTwo,
		gamesPageThree,
		gamesPageFour,
		gamesPageFive,
	]);

	gamesPageOne = date[0].data.results;
	gamesPageTwo = date[1].data.results;
	gamesPageThree = date[2].data.results;
	gamesPageFour = date[3].data.results;
	gamesPageFive = date[4].data.results;

	games = gamesPageOne
		.concat(gamesPageTwo)
		.concat(gamesPageThree)
		.concat(gamesPageFour)
		.concat(gamesPageFive);
	games = games.map((result) => {
		return {
			id: result.id,
			name: result.name,
			description: result.description,
			released: result.released,
			image: result.background_image,
			rating: result.rating,
			platforms: result.platforms.map((e) => e.platform.name),
			genres: result.genres.map((e) => e.name),
		};
	});
	return games;
};

// GET https://api.rawg.io/api/games?search={game}
const getApiByName = async (name) => {
	const resAxios = await axios.get(
		`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`
	);
	const { results } = resAxios.data;
	let response = results.map((result) => {
		return {
			id: result.id,
			name: result.name,
			released: result.released,
			image: result.background_image,
			rating: result.rating,
			platforms: result.platforms.map((e) => e.platform.name),
			genres: result.genres.map((e) => e.name),
		};
	});
	return response;
};

// GET https://api.rawg.io/api/games/{id}

const getApiById = async (id) => {
	const resAxios = await axios.get(
		`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`
	);
	let response = resAxios.data;
	return {
		id: response.id,
		name: response.name,
		released: response.released,
		image: response.background_image,
		rating: response.rating,
		platforms: response.platforms.map((e) => e.platform.name),
		genres: response.genres.map((e) => e.name),
	};
};

const getDbByName = async (name) => {
	const DBInfo = await getDBInfo();
	const filtByName = DBInfo.filter((games) => games.name.includes(name));
	return filtByName;
};

const getInfoByName = async (name) => {
	const apiByName = await getApiByName(name);
	const DbByName = await getDbByName(name);
	const infoNameTotal = apiByName.concat(DbByName);
	return infoNameTotal;
};

const getDBInfo = async () => {
	return await Videogame.findAll({
		include: {
			model: Genre,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
	});
};

const getAllInfo = async () => {
	const apiInfo = await getApiInfo();
	const bdInfo = await getDBInfo();
	const infoTotal = apiInfo.concat(bdInfo);
	return infoTotal;
};

router.get('/database', async (req, res) => {
	const gamesDB = await getDBInfo();

	res.json(gamesDB);
});

router.get('/', async (req, res) => {
	const { name } = req.query;
	try {
		if (name) {
			const infoByName = await getInfoByName(name);
			res.json(infoByName);
		} else {
			const allDate = await getAllInfo();
			res.json(allDate);
		}
	} catch (e) {
		res.send('Juego no encontrado');
	}
});

router.get('/', async (req, res) => {
	const { name } = req.query;
	try {
		if (name) {
			let juegoName = await Videogame.findAll({
				where: {
					name,
				},
				include: Genre,
			});
			return res.json(juegoName);
		}
		const gameName = await getInfoByName(name);
		res.json(gameName);
	} catch (e) {
		res.send('Nombre no encontrado');
	}
});

router.get('/database', async (req, res) => {
	const gamesDB = await Videogame.findAll();

	res.json(gamesDB);
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		if (!Number(id)) {
			let juegoId = await Videogame.findOne({
				where: {
					id,
				},
				include: {
					model: Genre,
					attributes: ['name'],
					through: {
						attributes: [],
					},
				},
			});
			return res.json(juegoId);
		}
		let gameId = await getApiById(id);
		return res.json(gameId);
	} catch (e) {
		res.send('Id no encontrado');
	}
});

router.post('/', async (req, res) => {
	const { name, description, released, image, rating, platforms, genre } =
		req.body;
	try {
		let genreDB = await Genre.findAll({
			where: { name: genre },
		});
		if (genreDB.length !== genre.length) {
			return res.json({ error: 'X genero no encontrado X' });
		}

		let id = uuidv4();

		let videoGameCreate = await Videogame.create({
			id: id,
			name,
			description,
			released,
			image,
			rating,
			platforms: [platforms],
		});

		videoGameCreate.addGenre(genreDB);
		res.send('!Juego creado con exito!');
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

module.exports = router;
