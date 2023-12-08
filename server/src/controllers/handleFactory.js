const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAll = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.find();

		res.status(200).json({
			status: 'success',
			results: doc.length,
			data: {
				doc,
			},
		});
	});

exports.getOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const { id } = req.params;
		const doc = await Model.findById(id);

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

exports.deleteOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const { id } = req.params;
		const doc = await Model.delete(id);

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
