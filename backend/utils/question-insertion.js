const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});

const mongoose = require('mongoose');

const Question = require('../models/Question')

mongoose.connect(process.env.URI_MONGO,
    { useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false, })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
    
let iRow = 0;



fs.createReadStream('utils/questions.csv')
    .pipe(csv())
    .on('data', async (row) => {
        try {
            const question = {};
            question['id'] = iRow++;
            question['question'] = { "fr" : row['Question FR'], "en" : row['Question EN']};
            question['answers'] = { "fr" : [row['Réponse Fr 1'], row['Réponse Fr 2'], row['Réponse Fr 3'], row['Réponse Fr 4']],
                "en" : [row['Réponse En 1'], row['Réponse En 2'], row['Réponse En 3'], row['Réponse En 4']]};
            question['correct'] = row['Bonne réponse'];
            const insert = new Question(question);
            await insert.save();
        } catch (err) {
            console.log(err);
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });