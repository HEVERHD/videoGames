const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('videogame', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUID,
			// allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING, //Cadena de letras
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT, //Texto
			allowNull: false,
		},
		released: {
			type: DataTypes.DATEONLY, //Fecha unica
		},
		rating: {
			type: DataTypes.FLOAT, //Decimal
		},
		platforms: {
			type: DataTypes.ARRAY(DataTypes.STRING), //Arreglo con Cadena de letras
			allowNull: false,
		},
		image: {
			type: DataTypes.TEXT, //URL
			allowNull: false,
		},
		createdInDb: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	});
};
