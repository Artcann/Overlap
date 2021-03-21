const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const questionRoutes = require('./routes/question');
const userRoutes = require('./routes/user');

mongoose.connect("mongodb+srv://artcann:hzKu5wQjHU9Yvakb@cluster0.d26vi.mongodb.net/overlap?retryWrites=true&w=majority",
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

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/question', questionRoutes);

module.exports = app;