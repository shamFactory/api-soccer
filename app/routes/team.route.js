const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Team = require('../controllers/team.controller');
const {verifyKey} = require('../middlewares/validations.middleware');

const controller = new Team();

router.get('/', controller.index)
router.get('/:id', verifyKey, controller.detail)

module.exports = router;