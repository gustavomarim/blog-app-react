import * as bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import expressSession from 'express-session';
import passport from 'passport';

require('./config/dbConfig');
require('./models/Post');
require('./models/Category');
require('./models/User');
require('./config/auth')(passport);

const admin = require('./routes/admin');
const user = require('./routes/user');
const home = require('./routes/home');
const post = require('./routes/post');

const app = express();
app.use(cors());

app.use(
  expressSession({
    secret: 'blogapp',
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = req.user || null;
  next();
});

app.use(express.json());

// CONFIGURAÇÕES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(admin);
app.use(user);
app.use(home);
app.use(post);

// HTTP SERVER
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} => http://localhost:${PORT}`);
});
