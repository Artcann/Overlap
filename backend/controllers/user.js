const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const path = require('path');
const { nanoid } = require('nanoid');

const User = require('../models/User');
const Character = require('../models/Character');

const sendMail = (email, body) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "login",
            user: "overlap.noreply@gmail.com",
            pass: process.env.GMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_MAIL,
        to: email,
        subject: "Testing email Verification",
        html: body
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            throw new Error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

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
        
        const body = "<h1>Valide ton profil en cliquant sur ce lien !</h1><br><a href=http://localhost:3000/api/auth/verif/" + user._id +
        ">Vérifier mon profil</a>";

        sendMail(req.body.email, body);

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
                process.env.RANDOM_TOKEN_SECRET,
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
            });

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

exports.sendPassEmail = async (req, res, next) => {
    try {
        if(await User.find({ email: req.body.email }).count() !== 0) {
            const token = nanoid();

            const body = "<h1>Reset ton mot de passe !</h1><br><a href=http://localhost:3000/api/auth/reset-pass/" + token +
            ">Reset mon mot de passe</a>"

            sendMail(req.body.email, body);

            await User.findOneAndUpdate(
                {
                    email: req.body.email,
                },
                {
                    password_token: token,
                });
            res.sendFile(path.join(__dirname, "../views/password_success.html"));
        } else {
            res.status(500).json({message: "Email inconnu"});
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.sendResetPassForm = async (req, res, next) => {
    if (await User.find({ password_token: req.params.token }).count() !== 0) {
        res.sendFile(path.join(__dirname, "../views/password_reset_form.html"));
    } else {
        res.sendFile(path.join(__dirname, "../views/password_error.html"));
    }
}

exports.resetPass = async (req, res, next) => {
    if (await User.find({ password_token: req.params.token }).count() !== 0) {
        const hash = await bcrypt.hash(req.body.password, 10)

        await User.findOneAndUpdate(
            {
                password_token: req.params.token,
            },
            {
                password: hash,
                password_token: null
            });
        res.sendFile(path.join(__dirname, "../views/password_success.html"));
    } else {
        res.sendFile(path.join(__dirname, "../views/password_error.html"));
    }
}