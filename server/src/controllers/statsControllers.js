const StatsRepo = require('../repo/stats-repo');
const catchAsync = require('../utils/catchAsync');

exports.getTotalNumberOfProducts = catchAsync(async (req, res, next) => {
	const userId = req.user.id;
	const total = await StatsRepo.totalNumberOfProducts(userId);

	res.status(200).json({
		status: 'success',
		data: {
			total,
		},
	});
});

exports.getTotalRevinew = catchAsync(async (req, res, next) => {
	const userId = req.user.id;
	const total = await StatsRepo.totalRevenew(userId);

	res.status(200).json({
		status: 'success',
		data: {
			total,
		},
	});
});

exports.getTotalOrderNumber = catchAsync(async (req, res, next) => {
	const userId = req.user.id;
	const total = await StatsRepo.totalNumberOfOrders(userId);

	res.status(200).json({
		status: 'success',
		data: {
			total,
		},
	});
});
