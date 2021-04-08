const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const rfs = require("rotating-file-stream");
require('dotenv').config({path: __dirname + '/.env'});

const questionRoutes = require('./routes/question');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const gameRoutes = require('./routes/game');
const { urlencoded } = require('body-parser');

mongoose.connect(process.env.URI_MONGO,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// CORS Handling

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

let accessLogStream = rfs.createStream("access.log", {
  interval: '1d',
  path: path.join(__dirname, 'log')
})

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.send({error: "DEFAULT_ERROR", message: "Une erreur innatendue s'est produite"});
}

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: accessLogStream }));


app.use('/auth', authRoutes);
app.use('/question', questionRoutes);
app.use('/user', userRoutes);
app.use('/game', gameRoutes)

module.exports = app;
