const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');

const User = require('../models/User');
const Character = require('../models/Character');

const sendMail = (email, body) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "login",
            user: config.mail.email,
            pass: config.mail.pass
        }
    });

    const mailOptions = {
        from: config.mail.email,
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

const getCharacter = async (userResponses) => {
    let overlapResponses = await Character.find();
    let character = [0, null];
    let score = 0;
    for(individualResponses of overlapResponses) {
        score = 0;
        for(i = 0; i < individualResponses.question_points.length; i++) {
            if(userResponses[i] == (individualResponses.question_points[i] - 1)) {
                score += 1;
            }
        }

        if((score === character[0] && Math.random() < 0.5) || score>character[0]) {
            character = [score, individualResponses.name]
        }
        console.log(character);
    }

    const characterUser = await Character.findOne({name: character[1]});

    return characterUser;
}

exports.signup = async (req, res, next) => {
    try {
        hash = await bcrypt.hash(req.body.password, 10)

        const domain = req.body.email.substr(-0, 14);

        const character = await getCharacter(req.body);
        character.question_points = null;
        console.log(character);
        console.log(req.body);

        const newUser = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
            verif: false,
            score: 0,
            personnage: character
        });
        let user = await newUser.save();

        // TODO: handle mail not sent !
        res.status(200).json({message: 'Utilisateur créé !', character});
        
        const body =
          `
            <div>
              <h1>Valide ton profil en cliquant sur ce lien !</h1><br>
              <a href="${config.domains.api}/auth/verif/${user._id}">Vérifier mon profil</a>
            </div>
          `;

        sendMail(req.body.email, body);


    } catch (err) {
        console.error(err)
        res.status(500).send(err);
    }

};

exports.login = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(500).json({
                error: 'Utilisateur non trouvé !',
                type: 'USER_NOT_FOUND'
            });
        }

        if(!user.verif) {
            return res.status(500).json({
                error: 'Utilisateur non vérifié !',
                type: 'USER_NOT_VERIFIED'
            });
        }

        let valid = await bcrypt.compare(req.body.password, user.password)

        if (!valid) {
            return res.status(500).json({
                error: 'Mot de passe incorrect !',
                type: 'INCORRECT_PASSWORD'
            });
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

            res.redirect(`${config.domains.front}/login?verif=true`);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const user = new Object(await User.findOne({_id: userId}));

        res.status(200).json({
          pseudo: user.pseudo,
          email: user.email,
          score: user.score,
          personnage: user.personnage,
          tokenExp: decodedToken.exp,
          _id: user._id
        });
    } catch (err) {
        console.error(err)
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

            const body = `
              <div>
                <h1>Reset ton mot de passe !</h1><br>
                <a
                  href="${config.domains.api}/auth/reset-pass/${token}"
                >Reset mon mot de passe</a>
              </div>
            `

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
