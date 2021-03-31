const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');
const gameCtrl = require('../controllers/game');

router.get('/ranking', auth, gameCtrl.getRanking);
router.get('/day/:number', auth, gameCtrl.getDay);

module.exports = router;