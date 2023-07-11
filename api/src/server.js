const server = require("./app");
const PORT = 3001;
const { conn } = require("./db");

conn
  .sync({ force: false }) //este force es para que cada vez que levanto la base de datOS NO TENGA PROBELMAS EN EL DESARROLLO DE LA MISMA
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server raised in port: " + PORT);
    });
  });
