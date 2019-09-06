const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Players = require('../controllers/players.controller');

const controller = new Players();

router.get('/', controller.index)

module.exports = router;