const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const gameCtrl = require('../controllers/game');

router.get('/:pseudo', userCtrl.getUser);

module.exports = router;