const UserRepo = require('../repo/user-repo');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { getAll, getOne, deleteOne, updateOne } = require('./handleFactory');

exports.getAllUsers = getAll(UserRepo);
exports.getSingleUser = getOne(UserRepo);
exports.deleteUser = deleteOne(UserRepo);
// exports.updateUserById = updateOne(UserRepo);

exports.updateUserById = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const data = req.body;
	const user = await UserRepo.findByIdAndUpdate(
		id,
		data.username,
		data.avater,
		data.email,
		data.role
	);

	if (!user) {
		return next(new AppError(`No user was found with that id`, 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			doc: user,
		},
	});
});

exports.getMe = catchAsync(async (req, res, next) => {
	const me = await UserRepo.findById(req.user.id);
	if (!me) {
		return next(new AppError(`Please login`, 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			doc: me,
		},
	});
});

exports.updateMe = catchAsync(async (req, res, next) => {
	const id = req.user.id;
	const data = req.body;
	const user = await UserRepo.findByIdAndUpdate(
		id,
		data.username,
		data.avater,
		data.email,
		data.role
	);

	if (!user) {
		return next(new AppError(`No user was found with that id`, 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			doc: user,
		},
	});
});
