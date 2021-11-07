import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createVideogame, getGenres } from '../../actions/index';
import './Create.css';

export default function Create() {
	const dispatch = useDispatch();
	const genres = useSelector((store) => store.genres);
	const genres1 = genres.slice(0, 10);
	const genres2 = genres.slice(10, 20);

	const [game, setGame] = useState({
		name: '',
		description: '',
		image: '',
		released: '',
		rating: 0,
		genres: [],
		platforms: [],
	});

	useEffect(() => {
		dispatch(getGenres());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const randomPlatforms = [
		'PC',
		'iOS',
		'Android',
		'macOS',
		'PlayStation 4',
		'PlayStation 5',
		'Xbox',
		'PS Vita',
	];

	const ChangeInput = (e) => {
		if (e.target.name === 'genres' || e.target.name === 'platforms') {
			const arr = game[e.target.name];
			setGame({
				...game,
				[e.target.name]: arr.concat(e.target.value),
			});
		} else {
			setGame({
				...game,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const obj = {
			name: game.name,
			description: game.description,
			image: game.image,
			released: game.released,
			rating: game.rating,
			genres: game.genres,
			platforms: game.platforms,
		};

		// Validaciones
		if (!obj.name) {
			alert('Hey! falta el nombre.');
			return;
		}
		if (!obj.description) {
			alert('Hey! aun falta la descripcion.');
			return;
		}
		if (!obj.released) {
			alert('Hey! falta la fecha de lanzamiento.');
			return;
		}
		if (obj.rating > 5 || obj.rating < 0) {
			alert('Hey! el rating debe estar entre 0 and 5.');
			return;
		}

		dispatch(createVideogame(obj));
		e.target.reset();
		alert('Videogame creado correctamente !');
		/* dispatch(getVideogames()) */

		setGame({
			name: '',
			description: '',
			image: '',
			released: '',
			rating: 0,
			genres: [],
			platforms: [],
		});
	};

	return (
		<div className='container'>
			<h1>ESTAS A PUNTO DE CREAR UN JUEGO!</h1>
			<h3>Rellena los siguientes campos</h3>
			<form
				id='survey-form'
				className='form'
				noValidate
				onChange={(e) => ChangeInput(e)}
				onSubmit={(e) => handleSubmit(e)}
			>
				<div>
					<div>
						<div className='divTitles'>
							<div>
								<label>-Name-</label>
								<input
									className='label'
									type='text'
									name='name'
									value={game.name}
								></input>
							</div>
							<div>
								<label>-Description-</label>
								<input
									className='label'
									type='text'
									name='description'
									value={game.description}
								></input>
							</div>
							<div>
								<label>-Released-</label>
								<input
									className='label'
									type='date'
									name='released'
									value={game.released}
								></input>
							</div>
							<div>
								<label>-Rating-</label>
								<input
									className='label'
									type='number'
									name='rating'
									value={game.rating}
								></input>
							</div>
						</div>
						<div className='imagediv'>
							<label>-Image URL-</label>
							<input
								className='imagein'
								type='text'
								name='image'
								value={game.image}
							></input>
						</div>
					</div>
					<div className='checkboxs'>
						<div className='checks'>
							<label>-Genres-</label>
							<div className='gendivs'>
								<div>
									{genres1.map((gen) => (
										<div key={gen.name}>
											<input
												type='checkbox'
												name='genres'
												value={gen.name}
											></input>
											<label name={gen}>{gen.name}</label>
										</div>
									))}
								</div>
								<div>
									{genres2.map((gen) => (
										<div key={gen.name}>
											<input
												type='checkbox'
												name='genres'
												value={gen.name}
											></input>
											<label name={gen}>{gen.name}</label>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className='checks'>
							<label>-Platforms-</label>
							<div>
								{randomPlatforms.map((P) => (
									<div key={P}>
										<input type='checkbox' name='platforms' value={P}></input>
										<label name={P}>{P}</label>
									</div>
								))}
							</div>
						</div>
					</div>
					<button className='button' type='submit'>
						CREAR!
					</button>
				</div>
			</form>
		</div>
	);
}
