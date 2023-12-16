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

router.use(protect);

router.route('/').post(createBuy).get(getMyBuy);
router.route('/checkout-session').get(getCheckoutSession);
router.route('/success').get(checkoutSuccess);
router.route('/total').get(getTotal);

module.exports = router;
