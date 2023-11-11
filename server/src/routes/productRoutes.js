const express = require('express');
const {
	getAllProducts,
	createProduct,
	getSingleProduct,
	deleteProduct,
} = require('../controllers/productControllers');

const { protect } = require('../controllers/authControllers');

const router = express.Router();

router.route('/').get(getAllProducts);

router.use(protect);
router.route('/').post(createProduct);
router.route('/:id').get(getSingleProduct).delete(deleteProduct);

module.exports = router;
