const express = require('express');
const {
	getAllProducts,
	createProduct,
	getSingleProduct,
	getMyProducts,
	deleteProduct,
	getProductsByUserId,
} = require('../controllers/productControllers');

const { protect } = require('../controllers/authControllers');

const router = express.Router();

router.route('/').get(getAllProducts);

router.use(protect);
router.route('/userId/:id').get(getProductsByUserId);
router.route('/myProducts').get(getMyProducts);
router.route('/').post(createProduct);
router.route('/:id').get(getSingleProduct).delete(deleteProduct);

module.exports = router;
