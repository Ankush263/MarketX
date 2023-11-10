const UserRepo = require('../repo/user-repo');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { getAll, getOne, deleteOne } = require('./handleFactory');

exports.getAllUsers = getAll(UserRepo);
exports.getSingleUser = getOne(UserRepo);
exports.deleteUser = deleteOne(UserRepo);

// exports.createUser = catchAsync(async (req, res, next) => {
// 	const { username, avater, email, password, role } = req.body;
// 	const user = await UserRepo.create(username, avater, email, password, role);

// 	res.status(200).json({
// 		status: 'success',
// 		data: {
// 			user,
// 		},
// 	});
// });

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
			user,
		},
	});
});
