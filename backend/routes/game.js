const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const gameCtrl = require('../controllers/game');

router.get('/ranking', gameCtrl.getRanking);
router.get('/day/:number', gameCtrl.getDay);
router.post('/day', gameCtrl.insertDay);

module.exports = router;