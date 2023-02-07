const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const admin = require('./routes/admin');

require('./config/dbConfig');

const app = express();

app.use(express.json());

// CONFIGURAÇÕES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROTAS
app.get('/', (req, res) => {
  return res.json({
    nome: 'Gustavo',
    profissao: 'Desenvolvedor',
  });
});

app.use('/admin', admin);

// HTTP SERVER
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} => http://localhost:${PORT}`);
});