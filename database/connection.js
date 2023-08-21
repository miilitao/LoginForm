// |Conexão com o banco de dados|

  const mongoose = require('mongoose');
  const server = 'mongodb://localhost:27017'
  const database = 'LoginUsuarios'
  
  mongoose.connect(`${server}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {console.log('Conexão bem sucedida!')}).catch((err) => {console.error('conection error' + err);
  process.exit();
  });

module.exports = mongoose;