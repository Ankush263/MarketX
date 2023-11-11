const ProductRepo = require('../repo/product-repo');
const catchAsync = require('../utils/catchAsync');
const { getAll, getOne, deleteOne } = require('./handleFactory');

exports.getAllProducts = getAll(ProductRepo);
exports.getSingleProduct = getOne(ProductRepo);
exports.deleteProduct = deleteOne(ProductRepo);

exports.createProduct = catchAsync(async (req, res, next) => {
	const { name, company, description, image, price, stock, unit, type } =
		req.body;
	const product = await ProductRepo.create(
		name,
		company,
		description,
		image,
		price,
		stock,
		unit,
		type,
		req.user.id
	);

	res.status(200).json({
		status: 'success',
		data: {
			data: product,
		},
	});
});
