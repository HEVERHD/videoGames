const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const { APYKEY } = process.env;
const { Genre } = require('../db');

router.get('/genres', async (req, res) => {
	try {
		let genres = await axios.get(
			`https://api.rawg.io/api/genres?key=${APIKEY}`
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
