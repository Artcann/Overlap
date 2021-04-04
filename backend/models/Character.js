const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
    name: { type:String, required: true},
    identifier: { type: String, required: false},
    description: { type: String, required: false},
    question_points: { type: Array, required: true}
})

module.exports = mongoose.model('Character', characterSchema);