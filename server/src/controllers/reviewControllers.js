const ReviewRepo = require('../repo/review-repo');
const UserRepo = require('../repo/user-repo');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* 
  TODO: Make sure that only the user with the "customer" role can create the review. ✅
  TODO: The user with the "business" role can't create the review. ✅
*/
exports.createReview = catchAsync(async (req, res, next) => {
	const { business_id, product_id, text, rating } = req.body;
	const user = await UserRepo.findById(req.user.id);

	if (user.role === 'business') {
		return next(
			new AppError(`You can't review a product from a business account`, 404)
		);
	}
	const doc = await ReviewRepo.create(
		req.user.id,
		business_id,
		product_id,
		text,
		rating
	);
	res.status(200).json({
		status: 'success',
		data: {
			doc,
		},
	});
});

exports.getReviewsByProductId = catchAsync(async (req, res, next) => {
	const { productId } = req.params;
	const review = await ReviewRepo.findByProductId(productId);
	if (!review) {
		return next(new AppError(`Review does not exists`, 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			data: review,
		},
	});
});

exports.updateReview = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { text, rating } = req.body;
	const review = await ReviewRepo.findById(id);
	if (!review) {
		return next(new AppError(`Review does not exists`, 404));
	}

	if (review.userId !== req.user.id) {
		return next(new AppError(`You are not the owner of this review`, 404));
	}

	const updatedReview = await ReviewRepo.update(text, rating, id);

	res.status(200).json({
		status: 'success',
		data: {
			data: updatedReview,
		},
	});
});

exports.deleteReview = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const review = await ReviewRepo.findById(id);
	if (!review) {
		return next(new AppError(`Review does not exists`, 404));
	}

	if (review.userId !== req.user.id) {
		return next(new AppError(`You are not the owner of this review`, 404));
	}
	await ReviewRepo.delete(id);

	res.status(201).json({
		status: 'success',
		data: [],
	});
});
