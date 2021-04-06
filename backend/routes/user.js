const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');
const gameCtrl = require('../controllers/game');

router.get('/me', auth, userCtrl.getUser);

module.exports = router;