const express = require('express');
const {
	createBuy,
	getMyBuy,
	getTotal,
	getCheckoutSession,
	checkoutSuccess,
	getOrderHistory,
} = require('../controllers/buyControllers');
const { protect, restrictTo } = require('../controllers/authControllers');

const router = express.Router();

router
	.route('/')
	.post(protect, restrictTo('customer'), createBuy)
	.get(protect, getMyBuy);
router.route('/success').get(checkoutSuccess);

router.use(protect);

router.route('/orderhistory').get(restrictTo('business'), getOrderHistory);
router
	.route('/checkout-session')
	.get(restrictTo('customer'), getCheckoutSession);
router.route('/total').get(getTotal);

module.exports = router;
