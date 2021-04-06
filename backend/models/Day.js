const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
    starting_date: { type: Date, required: true},
    questions: { type: Array, required: true},
    theme: { type: String, required: true}
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
