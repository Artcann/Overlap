const User = require('../models/User');
const Day = require('../models/Day');
const Character = require('../models/Character');

exports.getRanking = async (req, res, next) => {
    try {
        let ranking = await User.find().sort({ "point": 1, "_id": 1 });

        res.status(200).json(ranking);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getDdayInfo = async (req, res, next) => {
    try {
        let infos = await Day.findOne({ number: req.params.number });

        res.status(200).json(infos);
    } catch (err) {
        res.status(500).send(err);
    }
};