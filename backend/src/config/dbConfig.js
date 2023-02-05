const mongoose = require('mongoose');
require('dotenv').config();

// CONEXÃO COM O DB MONGODB ATLAS
const connection = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
