const ProductRepo = require('../repo/product-repo');
const UserRepo = require('../repo/user-repo');
const BusinessRepo = require('../repo/business-repo');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { getAll, getOne } = require('./handleFactory');
const { uploadImage } = require('./s3bucket');
const { s3 } = require('./s3');

exports.uploadImg = uploadImage.single('image');

exports.getAllProducts = getAll(ProductRepo);
exports.getSingleProduct = getOne(ProductRepo);

exports.deletePhoto = catchAsync(async (req, res, next) => {
	const product = await ProductRepo.findById(req.params.id);

	const parts = product.image[0].split(
		`https://${process.env.BUCKET_NAME}.s3.amazonaws.com/`
	);
	const key = parts[1];

	const params = {
		Bucket: `${process.env.BUCKET_NAME}`,
		Key: key,
	};
	s3.deleteObject(params, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	});
	next();
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const product = await ProductRepo.findById(id);
	const businessAccount = await BusinessRepo.findByUserId(product.userId);

	await BusinessRepo.removeProductId(product.id, businessAccount.userId);

	const doc = await ProductRepo.delete(id);

	if (!doc) {
		return next(new AppError(`No document was found with that id`, 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			doc,
		},
	});
});

exports.createProduct = catchAsync(async (req, res, next) => {
	const { name, company, description, price, tags, weight, type } = req.body;
	const me = await UserRepo.findById(req.user.id);
	if (me.role !== 'business') {
		return next(new AppError(`Please sign in from a business account`, 401));
	}

	const businessProfile = await BusinessRepo.findByUserId(req.user.id);
	const key = req.file.key;
	const image = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${key}`;

	const product = await ProductRepo.create(
		name,
		company,
		description,
		[image],
		price,
		[tags],
		weight,
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

exports.checkUser = catchAsync(async (req, res, next) => {
	const product = await ProductRepo.findById(req.params.id);
	const me = await UserRepo.findById(req.user.id);
	if (product.userId !== me.id) {
		return next(new AppError(`You can't update others product`, 404));
	}
	next();
});

exports.updateProduct = catchAsync(async (req, res, next) => {
	const { name, company, description, price, tags, weight, type } = req.body;
	const update = await ProductRepo.findByIdAndUpdate(
		req.params.id,
		name,
		company,
		description,
		price,
		tags,
		weight,
		type
	);

	res.status(200).json({
		status: 'success',
		data: {
			data: update,
		},
	});
});

exports.updateProductImage = catchAsync(async (req, res, next) => {
	const key = req.file.key;
	const image = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${key}`;
	const update = await ProductRepo.findByIdAndUpdateImage(
		[image],
		req.params.id
	);

	res.status(200).json({
		status: 'success',
		data: {
			data: update,
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

exports.searchByUsername = catchAsync(async (req, res, next) => {
	const searchTerms = req.query.name;
	const doc = await ProductRepo.searchProductsByName(searchTerms);

	res.status(200).json({
		status: 'success',
		data: {
			data: doc,
		},
	});
});

exports.getMyProducts = getProductByUserId('myProducts');

exports.getProductsByUserId = getProductByUserId('userProducts');
