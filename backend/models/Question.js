const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const questionSchema = mongoose.Schema({
    id: {type: Number, required: true, unique: true},
});

questionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Question', questionSchema);