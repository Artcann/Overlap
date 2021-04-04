const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    pseudo: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    score: { type: Number, required: false},
    personnage: { type: Object, required: false},
    verif: { type: Boolean, required: false},
    progression: { type: Object, required: false},
    password_token: { type: String, required: false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);