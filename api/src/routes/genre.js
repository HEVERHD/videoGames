const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const { Genre } = require('../db');
// const { v4: uuidv4 } = require('uuid');

// GET https://api.rawg.io/api/genres

router.get('/genres', async (req, res) => {
	try {
		let genres = await axios.get(
			`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`
		);
		genres = genres.data.results;

		const mapGeneros = genres.map((e) => {
			return {
				id: e.id,
				name: e.name,
			};
		});
		mapGeneros.forEach((e) => {
			Genre.findOrCreate({
				where: {
					name: e.name,
				},
			});
		});

		res.json(mapGeneros);
	} catch (e) {
		res.send(e);
	}
});

module.exports = router;
