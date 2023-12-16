const express = require('express');
const {
	createBuy,
	getMyBuy,
	getTotal,
	getCheckoutSession,
	checkoutSuccess,
} = require('../controllers/buyControllers');
const { protect } = require('../controllers/authControllers');

const router = express.Router();

router.route('/').post(protect, createBuy).get(protect, getMyBuy);
router.route('/checkout-session').get(protect, getCheckoutSession);
router.route('/success').get(checkoutSuccess);
router.route('/total').get(protect, getTotal);

module.exports = router;
