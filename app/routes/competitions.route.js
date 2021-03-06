const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Competitions = require('../controllers/competitions.controller');
const {verifyKey} = require('../middlewares/validations.middleware');

const controller = new Competitions();

router.get('/', controller.index)
router.get('/:id', verifyKey, controller.detail)

module.exports = router;