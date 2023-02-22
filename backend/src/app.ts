import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import configurePassport from './config/auth';

require('./config/dbConfig');
require('./models/User');
require('./models/Post');
require('./models/Category');

const admin = require('./routes/admin');
const user = require('./routes/user');
const home = require('./routes/home');
const post = require('./routes/post');
const category = require('./routes/category');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// CONFIGURAÇÕES
// Sessão
app.use(
  session({
    secret: 'blogapp',
    resave: true,
    saveUninitialized: true,
  }),
);

// MIDDLEWARES
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(home);
app.use(user);
app.use(admin);
app.use(post);
app.use(category);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} => http://localhost:${PORT}`);
});
