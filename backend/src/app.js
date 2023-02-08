const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

require('./config/dbConfig');
require('./models/Post');
require('./models/Category');
require('./models/User');
require('./config/auth')(passport);

const admin = require('./routes/admin');
const user = require('./routes/user');

const app = express();
app.use(cors());

app.use(
  session({
    secret: 'blogapp',
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(express.json());

// CONFIGURAÇÕES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(admin);
app.use(user);

// HTTP SERVER
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} => http://localhost:${PORT}`);
});
