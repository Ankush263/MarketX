const catchAsync = require('../../utils/catchAsync');
const {
	createCustomQuery,
	createJoinQuery,
	createJoinQueryForbuyProductsAndUsers,
} = require('./queries');

exports.usersDimensions = catchAsync(async (req, res, next) => {
	await createCustomQuery(req, res, next, 'users');
});

exports.productsDimensions = catchAsync(async (req, res, next) => {
	await createCustomQuery(req, res, next, 'products');
});

exports.productAndUserJoinDimension = catchAsync(async (req, res, next) => {
	await createJoinQuery(req, res, next, 'products', 'users');
});

exports.buyDimensions = catchAsync(async (req, res, next) => {
	await createCustomQuery(req, res, next, 'buy');
});

exports.buyProductsAndUsersJoinDimension = catchAsync(
	async (req, res, next) => {
		await createJoinQueryForbuyProductsAndUsers(
			req,
			res,
			next,
			'buy',
			'products',
			'users'
		);
	}
);
