const express = require('express');
const {
	usersDimensions,
	productsDimensions,
	buyDimensions,
	productAndUserJoinDimension,
} = require('../controllers/customqueries/customQueryControllers');
const { protect, restrictTo } = require('../controllers/authControllers');

const router = express.Router();

router.use(protect);
router.use(restrictTo('business'));

router.route('/users').get(usersDimensions);
router.route('/products').get(productsDimensions);
router.route('/buy').get(buyDimensions);
router.route('/joinProductsAndUsers').get(productAndUserJoinDimension);

module.exports = router;
