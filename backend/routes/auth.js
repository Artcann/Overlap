const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/verif/:id', userCtrl.verif);
router.get('/forgot-pass', userCtrl.showFormPass);
router.post('/forgot-pass', userCtrl.sendPassEmail);
router.get('/reset-pass/:token', userCtrl.sendResetPassForm);
router.post('/reset-pass/:token', userCtrl.resetPass);

module.exports = router;