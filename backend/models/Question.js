const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const questionSchema = mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    question: { type: Array, required: true},
    answer: { type: Array, required: true},
    type: { type: String, required: false},
    image: { type: String, required: false},
    spotify_link: { type: String, required: false}
});

questionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Question', questionSchema);