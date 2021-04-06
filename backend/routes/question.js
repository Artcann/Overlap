const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const questionCtrl = require('../controllers/question');

router.get('/', auth, questionCtrl.getAllQuestion);
router.post('/', auth, questionCtrl.createQuestion);
router.get('/:id', auth, questionCtrl.getOneQuestion);
router.put('/:id', auth, questionCtrl.modifyQuestion);
router.delete('/:id', auth, questionCtrl.deleteQuestion);

module.exports = router;