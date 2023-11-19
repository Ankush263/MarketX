const express = require('express');
const {
	createReview,
	getReviewsByProductId,
	updateReview,
	deleteReview,
} = require('../controllers/reviewControllers');

const { protect } = require('../controllers/authControllers');

const router = express.Router();

router.use(protect);

router.route('/').post(createReview);
router.route('/:productId').get(getReviewsByProductId);
router.route('/:id').patch(updateReview).delete(deleteReview);

module.exports = router;
