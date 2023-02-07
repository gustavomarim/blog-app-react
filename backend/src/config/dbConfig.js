const mongoose = require('mongoose');
require('dotenv').config();

// CONEXÃO COM O BANCO DE DADOS MONGODB ATLAS
mongoose.set('strictQuery', true);
const connection = mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(`Error to connect: ${err}`));

module.exports = connection;
