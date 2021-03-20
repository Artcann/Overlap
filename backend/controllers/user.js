const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../models/User');

exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
            verif: req.body.verif
        });
        user.save(function(err, user){
            const userUid = user._id;
        })
        .then(
            () => {
                res.status(201).json({message: 'Utilisateur créé !'});

            }
        ).catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

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
        html: "<h1>Valide ton profil en cliquant sur ce lien !</h1><br><a href=https://localhost:3000/api/auth/verif/" +
        ">Vérifier mon profil</a>"
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(500).json({ error: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
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
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.verif = (req, res, next) => {
    User.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        {
            verif: true,
        }).then(
            () => {
                res.status(200).json({
                    message: "User verified!"
                });
            }
        ).catch(
            (error) => {
                res.status(500).json({
                    error: error
                });
            }
        );
};