const dotenv = require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const signIn = require('./controllers/signIn');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./middleware/authorization');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },

  // For local development:
  // copy-paste: connection: process.env.POSTGRES_URI,

  // For Heroku
  // {
  // connectionString: process.env.DATABASE_URL,
  // ssl: true,
  // }
});

const whitelist = [
  'https://app-smartbrain.herokuapp.com',
  'https://powerful-depths-38914.herokuapp.com',
];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
  methods: ['GET', 'PUT', 'POST'],
};

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(morgan('combined'));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('It is working!');
});
app.post('/signIn', (req, res) => {
  signIn.signInAuthentication(req, res, db, bcrypt);
});
app.post('/register', (req, res) => {
  register.registerAuthentication(req, res, db, bcrypt);
});
app.get('/profile/:id', auth.requireAuth, (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.post('/profile/:id', auth.requireAuth, (req, res) => {
  profile.handleProfileUpdate(req, res, db);
});
app.put('/image', auth.requireAuth, (req, res) => {
  image.handleImage(req, res, db);
});
app.post('/imageUrl', auth.requireAuth, (req, res) => {
  image.handleApiCall(req, res);
});
app.listen(PORT || 3000, () => {
  console.log(`app is running on ${PORT}`);
});

/*
/ --> res = this is working
/signIn --> POST = success / fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> user

*/
