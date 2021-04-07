const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
    name: { type:String, required: true},
    identifier: { type: String, required: false},
    description: { type: Object, required: false},
    question_points: { type: Array, required: true}
})

module.exports = mongoose.model('Character', characterSchema);