const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Competitions = require('../controllers/competitions.controller');

const controller = new Competitions();
router.get('/', controller.index)

module.exports = router;