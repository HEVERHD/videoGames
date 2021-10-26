import {
	buscar,
	buscarPorNombre,
	buscarNombrePorId,
	dataBase,
	obtenerGeneros,
	gameByGenre,
	gameByRating,
	alphabeticalOrder,
	postSubmit,
} from './actions';

const initialStore = {
	fullGames: [],
	videoGames: [],
	name: [],
	id: [],
	database: [],
	genres: [],
	platforms: [],
	gamesFilterByGenre: [],
	gamesFilterByRating: [],
	order: [],
	resPost: [],
};

const reducer = (state = initialStore, action) => {
	switch (action.type) {
		case buscar:
			return {
				...state,
				videoGames: action.payload,
				/* .filter((e, i) => {
                if(i <= 15){
                    return e
                }
            }), */ fullGames: action.payload,
			};

		case buscarPorNombre:
			return {
				...state,
				videoGames: action.payload == null ? state.fullGames : action.payload,
			};

		case buscarNombrePorId:
			return {
				...state,
				id: [action.payload],
			};

		case dataBase:
			return {
				...state,
				videoGames: action.name == 'Yes' ? action.payload : state.fullGames,
			};

		case obtenerGeneros:
			return {
				...state,
				genres: action.payload,
			};

		case gameByGenre:
			return {
				...state,
				videoGames: action.payload.filter((e) => {
					for (let i = 0; i < e.genres.length; i++) {
						if (e.genres[i].name === action.name) {
							return e;
						}
					}
				}),
			};

		case gameByRating:
			return {
				...state,
				videoGames:
					action.descAsc === 'Asc'
						? action.payload.sort(function (a, b) {
								if (a.rating > b.rating) {
									return 1;
								}
								if (a.rating < b.rating) {
									return -1;
								}
								return 0;
						  })
						: action.payload.sort(function (a, b) {
								if (a.rating < b.rating) {
									return 1;
								}
								if (a.rating > b.rating) {
									return -1;
								}
								return 0;
						  }),
			};

		case alphabeticalOrder:
			return {
				...state,
				videoGames:
					action.descAsc === 'A - Z'
						? action.payload.sort(function (a, b) {
								if (a.name > b.name) {
									return 1;
								}
								if (a.name < b.name) {
									return -1;
								}
								return 0;
						  })
						: action.payload.sort(function (a, b) {
								if (a.name < b.name) {
									return 1;
								}
								if (a.name > b.name) {
									return -1;
								}
								return 0;
						  }),
			};
		case postSubmit:
			return {
				...state,
				resPost: action.postgame,
			};

		default:
			return state;
	}
};

export default reducer;
