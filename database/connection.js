const mongoose = require('mongoose');
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const connect = () => {
  mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@loginusuarios.6cisbf6.mongodb.net/?retryWrites=true&w=majority`)

  const connection = mongoose.connection;

  connection.on("error", () => {
    console.log('Erro ao tentar conectar com o MongoDB');
  })

  connection.on("open", () => {
    console.log("Conectado ao mongoDB com sucesso!")
  })
}

connect();

module.exports = mongoose;