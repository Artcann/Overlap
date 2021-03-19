const Question = require('../models/Question');

exports.createQuestion = (req, res, next) => {
    const question = new Question({
        title: req.body.title,
        point: req.body.point
    });
    question.save().then(
        () => {
            res.status(201).json({
                message: 'Question saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getOneQuestion = (req, res, next) => {
    Question.findOne({
        _id: req.params.id
    }).then(
        (question) => {
            res.status(200).json(question);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.getOneAnswer = (req, res, next) => {
    Question.findOne({
        _id: req.params.id
    }).then(
        (question) => {
            res.status(200).json(question);
        }
    )
}

exports.modifyQuestion = (req, res, next) => {
    const question = new Question({
        _id: req.params.id,
        title: req.body.title,
        point: req.body.point
    });
    Question.updateOne({_id: req.params.id}, question).then(
        () => {
            res.status(201).json({
                message: "Question updated successfully!"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteQuestion = (req, res, next) => {
    Question.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: "Question deleted successfully!"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getAllQuestion = (req, res, next) => {
    Question.find().then(
        (questions) => {
            res.status(200).json(questions);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};