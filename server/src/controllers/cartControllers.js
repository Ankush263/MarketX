const CartRepo = require('../repo/cart-repo');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { deleteOne } = require('./handleFactory');

exports.addItemToCart = catchAsync(async (req, res, next) => {
	const { productId } = req.body;
	const cart = await CartRepo.addToCart(req.user.id, productId);

	res.status(200).json({
		status: 'success',
		data: {
			cart,
		},
	});
});

exports.removeItemsFromCart = catchAsync(async (req, res, next) => {
	const { productId } = req.body;
	const cart = await CartRepo.removeFromCart(req.user.id, productId);

	res.status(200).json({
		status: 'success',
		data: {
			cart,
		},
	});
});

exports.getTotal = catchAsync(async (req, res, next) => {
	const total = await CartRepo.getTotal(req.user.id);

	if (!total) {
		return next(new AppError(`Please add items to the cart first`, 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			total,
		},
	});
});

exports.getMyCart = catchAsync(async (req, res, next) => {
	const id = req.user.id;
	const cart = await CartRepo.findByUserId(id);

	if (!cart) {
		return next(new AppError(`Your cart does not exists`, 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			cart,
		},
	});
});

exports.getMyCartWithProducts = catchAsync(async (req, res, next) => {
	const id = req.user.id;
	const cart = await CartRepo.getCart(id);

	if (!cart) {
		return next(new AppError(`Your cart does not exists`, 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			cart,
		},
	});
});

exports.checkOwner = catchAsync(async (req, res, next) => {
	const id = req.params.id;
	const cart = await CartRepo.findById(id);
	if (cart.userId !== req.user.id) {
		return next(new AppError(`You are not the owner of this cart`, 404));
	}
	next();
});

exports.deleteCart = deleteOne(CartRepo);
