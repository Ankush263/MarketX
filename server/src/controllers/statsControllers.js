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

exports.getTodaysRevenew = catchAsync(async (req, res, next) => {
	const userId = req.user.id;
	let revenew = await StatsRepo.todaysRevenew(userId);

	res.status(200).json({
		status: 'success',
		data: {
			revenew,
		},
	});
});

exports.getYesterdaysRevenew = catchAsync(async (req, res, next) => {
	const userId = req.user.id;
	let revenew = await StatsRepo.yesterdaysRevenew(userId);
	revenew.sum = revenew.sum === null ? 0 : revenew.sum;

	res.status(200).json({
		status: 'success',
		data: {
			revenew,
		},
	});
});

exports.getSevenDaysRevenew = catchAsync(async (req, res, next) => {
	const userId = req.user.id;
	const revenew = await StatsRepo.pastSevenDaysRevenew(userId);

	res.status(200).json({
		status: 'success',
		data: {
			revenew,
		},
	});
});

exports.getRevenewPercentOfTodayAndTomorrow = catchAsync(
	async (req, res, next) => {
		const userId = req.user.id;
		const revenew = await StatsRepo.revenewPercent(userId);

		res.status(200).json({
			status: 'success',
			data: {
				revenew,
			},
		});
	}
);

exports.getProductBasedOnTags = catchAsync(async (req, res, next) => {
	const userId = req.user.id;
	const tag = req.query.tag;
	console.log(typeof tag);
	const product = await StatsRepo.productBasedOnTags(tag, userId);

	res.status(200).json({
		status: 'success',
		data: {
			product,
		},
	});
});

exports.getTotalProductInCart = catchAsync(async (req, res, next) => {
	const userId = req.user.id;
	const total = await StatsRepo.totalProductInCart(userId);

	res.status(200).json({
		status: 'success',
		data: {
			total,
		},
	});
});

exports.getTotalProductsSold = catchAsync(async (req, res, next) => {
	const userId = req.user.id;
	const total = await StatsRepo.totalProductSell(userId);

	res.status(200).json({
		status: 'success',
		data: {
			total,
		},
	});
});

exports.getProductSaleBasedOntags = catchAsync(async (req, res, next) => {
	const userId = req.user.id;
	const result = await StatsRepo.productSaleBasedOntags(userId);

	res.status(200).json({
		status: 'success',
		data: {
			result,
		},
	});
});
