// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo vacío para poder usarlo de relación entre Dog y Temperament a través de sus id
  // https://sebhastian.com/sequelize-belongstomany/
  sequelize.define("DogTemperament", {}, { timestamps: false });
};
