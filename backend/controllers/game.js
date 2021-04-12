const User = require('../models/User');
const Day = require('../models/Day');
const Character = require('../models/Character');

exports.getRanking = async (req, res, next) => {
    try {
        let ranking = await User
                              .find({
                                  verif: true
                              })
                              .select({
                                "pseudo": 1,
                                "score": 1
                              })
                              .sort({ "score": -1, "_id": 1 });
        

        res.status(200).json(ranking);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getDay = async (req, res, next) => {
    try {
        let infos = await Day.getDay();

        if (!infos) {
            infos = {
                _id: null,
                theme: "notStarted"
            }
        }

        res.status(200).json({
          _id: infos._id,
          theme: infos.theme
        });
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
