const express = require('express');
const {
	addItemToCart,
	getMyCart,
	checkOwner,
	deleteCart,
	getMyCartWithProducts,
	getTotal,
	removeItemsFromCart,
	deleteCartItemsByUserId,
} = require('../controllers/cartControllers');

const { protect, restrictTo } = require('../controllers/authControllers');

const router = express.Router();

router.use(protect);
router.use(restrictTo('customer'));

router.route('/myCart').get(getMyCartWithProducts);
router.route('/total').get(getTotal);
router.route('/remove').post(removeItemsFromCart);
router.route('/deleteByUserId').delete(deleteCartItemsByUserId);
router.route('/').post(addItemToCart).get(getMyCart);
router.route('/:id').delete(checkOwner, deleteCart);

module.exports = router;
