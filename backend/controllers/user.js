const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const path = require('path');

const User = require('../models/User');

exports.signup = async (req, res, next) => {
    try {
        hash = await bcrypt.hash(req.body.password, 10)

        const newUser = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
            verif: false,
            score: 0
        });
        let user = await newUser.save();
        res.status(201).json({message: 'Utilisateur créé !'});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "login",
                user: "overlap.noreply@gmail.com",
                pass: "J?KgyqkjfL4}`6s3"
            }
        });

        const mailOptions = {
            from: process.env.GMAIL_MAIL,
            to: req.body.email,
            subject: "Testing email Verification",
            html: "<h1>Valide ton profil en cliquant sur ce lien !</h1><br><a href=http://localhost:3000/api/auth/verif/" + user._id +
            ">Vérifier mon profil</a>"
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }

};

exports.login = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(500).json({ error: 'Utilisateur non trouvé !'});
        }
        let valid = await bcrypt.compare(req.body.password, user.password)

        if (!valid) {
            return res.status(500).json({ error: 'Mot de passe incorrect !'});
        }
        res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.verif = async (req, res, next) => {
    try {
        await User.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                verif: true,
            })

            res.status(200).json({
                message: "User verified!"
            });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        let user = await User.findOne({pseudo: req.params.pseudo});

        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.showFormPass = async (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views/password_form.html"));
}