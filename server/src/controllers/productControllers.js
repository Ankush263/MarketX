const ProductRepo = require('../repo/product-repo');
const UserRepo = require('../repo/user-repo');
const BusinessRepo = require('../repo/business-repo');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { getAll, getOne, deleteOne } = require('./handleFactory');

exports.getAllProducts = getAll(ProductRepo);
exports.getSingleProduct = getOne(ProductRepo);
// TODO: Before deleting a product, I should delete the product id from business table
exports.deleteProduct = deleteOne(ProductRepo);

exports.createProduct = catchAsync(async (req, res, next) => {
	const { name, company, description, image, price, stock, unit, type } =
		req.body;
	const me = await UserRepo.findById(req.user.id);

	if (me.role !== 'business') {
		return next(new AppError(`Please sign in from a business account`, 401));
	}

	const businessProfile = await BusinessRepo.findByUserId(req.user.id);

	const product = await ProductRepo.create(
		name,
		company,
		description,
		image,
		price,
		stock,
		unit,
		type,
		req.user.id,
		businessProfile.id
	);

	await BusinessRepo.addProductId(product.id, req.user.id);

	res.status(200).json({
		status: 'success',
		data: {
			data: product,
		},
	});
});

const getProductByUserId = (type) =>
	catchAsync(async (req, res, next) => {
		const products =
			type === 'myProducts'
				? await ProductRepo.findByUserId(req.user.id)
				: await ProductRepo.findByUserId(req.params.id);

		if (!products) {
			return next(new AppError(`User id does not exists`, 404));
		}

		res.status(200).json({
			status: 'success',
			data: {
				doc: products,
			},
		});
	});

exports.getMyProducts = getProductByUserId('myProducts');

exports.getProductsByUserId = getProductByUserId('userProducts');
