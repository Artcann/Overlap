const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    title: { type: String, required: true},
    question_id: { type: String, required: true}
})

module.exports = mongoose.model('Answer', answerSchema);