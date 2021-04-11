const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const questionSchema = mongoose.Schema({
    id: { type: Number, required: true, unique: true},
    question: { type: Object, required: true},
    answers: { type: Object, required: true},
    correct: { type: Number, required: true},
    source: { type: String, required: false},
    image: { type: String, required: false}
});

questionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Question', questionSchema);