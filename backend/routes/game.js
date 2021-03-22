const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const gameCtrl = require('../controllers/game');

router.get('/ranking', userCtrl.getRanking);

module.exports = router;