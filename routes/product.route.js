const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.get('/', productController.index);
router.post('/create', productController.create);
router.get('/:id', productController.get);
router.put('/update/:id', productController.update);
router.delete('/delete/:id', productController.delete);

module.exports = router;