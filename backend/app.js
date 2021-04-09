const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.disable('x-powered-by');

app.use('/auth', authRoutes);
app.use('/question', questionRoutes);
app.use('/user', userRoutes);
app.use('/game', gameRoutes)

module.exports = app;
