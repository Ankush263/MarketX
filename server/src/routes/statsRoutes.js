const express = require('express');

const {
	getTotalNumberOfProducts,
	getTotalRevinew,
	getTotalOrderNumber,
	getTodaysRevenew,
	getYesterdaysRevenew,
	getSevenDaysRevenew,
	getRevenewPercentOfTodayAndTomorrow,
	getProductBasedOnTags,
	getTotalProductInCart,
	getTotalProductsSold,
	getProductSaleBasedOntags,
} = require('../controllers/statsControllers');

const { protect, restrictTo } = require('../controllers/authControllers');

const router = express.Router();

router.use(protect);
router.use(restrictTo('business'));

router.route('/totalProducts').get(getTotalNumberOfProducts);
router.route('/totalRevenew').get(getTotalRevinew);
router.route('/totalOrderNumber').get(getTotalOrderNumber);
router.route('/todaysRevenew').get(getTodaysRevenew);
router.route('/yesterdaysRevenew').get(getYesterdaysRevenew);
router.route('/sevenDaysRevenew').get(getSevenDaysRevenew);
router
	.route('/revenewPercentOfTodayAndTomorrow')
	.get(getRevenewPercentOfTodayAndTomorrow);
router.route('/tags').get(getProductBasedOnTags);
router.route('/totalInCart').get(getTotalProductInCart);
router.route('/totalProductSold').get(getTotalProductsSold);
router.route('/productSellOnTags').get(getProductSaleBasedOntags);

module.exports = router;
