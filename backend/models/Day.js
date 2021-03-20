const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
    number: { type: Number, required: true},
    starting_date: { type: Date, required: true},
    questions: { type: Array, required: true},
    background: { type: String, required: false},
    overlay: { type: String, required: false},
    intro_text: { type: String, required: false}
})

module.exports = mongoose.model('Day', daySchema);