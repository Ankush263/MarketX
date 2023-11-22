const BuyRepo = require('../repo/buy-repo');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createBuy = catchAsync(async (req, res, next) => {
	const { payment_option, paid } = req.body;
	const buy = await BuyRepo.buy(req.user.id, payment_option, paid);

	res.status(200).json({
		status: 'success',
		data: {
			buy,
		},
	});
});

exports.getMyBuy = catchAsync(async (req, res, next) => {
	const buy = await BuyRepo.getBuy(req.user.id);
	if (!buy) {
		return next(new AppError(`You don't have any buy items`, 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			buy,
		},
	});
});

exports.getTotal = catchAsync(async (req, res, next) => {
	const total = await BuyRepo.totalCount(req.user.id);
	if (!total) {
		return next(
			new AppError(
				`There seem to be some errors that occurred while trying to determine the total.`,
				404
			)
		);
	}

	res.status(200).json({
		status: 'success',
		data: {
			total,
		},
	});
});
