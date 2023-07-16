const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo vacío para poder usarlo de relación entre Dog y Temperament
  // https://sebhastian.com/sequelize-belongstomany/
  sequelize.define("DogTemperament", {}, { timestamps: false });
};
