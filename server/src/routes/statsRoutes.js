const express = require('express');

const {
	getTotalNumberOfProducts,
	getTotalRevinew,
	getTotalOrderNumber,
} = require('../controllers/statsControllers');

const { protect, restrictTo } = require('../controllers/authControllers');

const router = express.Router();

router.use(protect);
router.use(restrictTo('business'));

router.route('/totalProducts').get(getTotalNumberOfProducts);
router.route('/totalRevenew').get(getTotalRevinew);
router.route('/totalOrderNumber').get(getTotalOrderNumber);

module.exports = router;
