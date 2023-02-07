const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./config/dbConfig');
require('./models/Post');
require('./models/Category');

// const Post = mongoose.model('posts');
// const Category = mongoose.model('categories');

const admin = require('./routes/admin');

const app = express();

app.use(express.json());
app.use(admin);

// CONFIGURAÇÕES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// HTTP SERVER
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} => http://localhost:${PORT}`);
});
