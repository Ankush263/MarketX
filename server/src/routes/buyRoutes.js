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
router.use(protect);

router.route('/').post(restrictTo('customer'), createBuy).get(getMyBuy);
router.route('/orderhistory').get(restrictTo('business'), getOrderHistory);
router
	.route('/checkout-session')
	.get(restrictTo('customer'), getCheckoutSession);
router.route('/success').get(checkoutSuccess);
router.route('/total').get(getTotal);

module.exports = router;
