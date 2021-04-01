const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
    number: { type: Number, required: true},
    starting_date: { type: Date, required: true},
    questions: { type: Array, required: true},
    background: { type: String, required: false},
    overlay: { type: String, required: false},
    intro_text: { type: String, required: false}
})

const model = mongoose.model('Day', daySchema);

model.getDay = async () => {
    const date = Date.now();
    const days = await model.find().sort({ "starting_date": -1});
    let day = undefined;
    for (const currentDay of days) {
        if (currentDay.starting_date < date) {
            day = currentDay
            break
        }
    }

    return day;
}

module.exports = model;