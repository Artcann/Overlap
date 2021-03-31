const User = require('../models/User');
const Day = require('../models/Day');
const Character = require('../models/Character');

exports.getRanking = async (req, res, next) => {
    try {
        let ranking = await User.find().sort({ "score": -1, "_id": 1 });

        res.status(200).json(ranking);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getDay = async (req, res, next) => {
    try {
        let infos = await Day.findOne({ number: req.params.number });

        res.status(200).json(infos);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.insertDay = async (req, res, next) => {
    try {
        const newDay = new Day({
            number: req.body.number,
            starting_date: new Date("2016-05-18T16:00:00Z"),
            questions: req.body.questions,
            background: req.body.background,
            overlay: req.body.overlay,
            intro_text: req.body.intro_text
        })
        let day = await newDay.save();
        res.status(201).json({message: 'Jour créé !', day: day});
    } catch (err) {
        res.status(500).send(err);
    }
};