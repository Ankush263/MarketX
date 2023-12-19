const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const UserRepo = require('../repo/user-repo');
const BusinessRepo = require('../repo/business-repo');
const bcrypt = require('bcryptjs');
const pool = require('../pool');
require('dotenv').config({ path: '../../.env' });

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createAndSendToken = (user, statusCode, res) => {
	const token = signToken(user.id);

	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

	res.cookie('jwt', token, cookieOptions);

	user.password = undefined;

	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	const { username, avater, email, password, role } = req.body;
	const saltedPassword = await bcrypt.hash(password, 12);
	const newUser = await UserRepo.create(
		username,
		avater,
		email,
		saltedPassword,
		role
	);

	if (role === 'business') {
		await BusinessRepo.create(newUser.id);
	}

	createAndSendToken(newUser, 201, res);
});

const correctPassword = async (existingPassword, givenPassword) => {
	return await bcrypt.compare(existingPassword, givenPassword);
};

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new AppError(`Please provide email & password`, 404));
	}

	const user = await UserRepo.findByEmail(email);

	if (!user || !(await correctPassword(password, user.password))) {
		return next(new AppError(`Incorrect email or password`, 401));
	}

	createAndSendToken(user, 200, res);
});

exports.logout = (req, res) => {
	res.cookie('jwt', 'loggedout', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});
	res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}
	if (!token) {
		return next(
			new AppError(`You aren't logged in! Please log in to get access`, 401)
		);
	}

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
	const freshUser = await UserRepo.findById(decoded.id);
	if (!freshUser) {
		return next(
			new AppError(`The user belonging to this token does no longer exist`, 401)
		);
	}

	req.user = freshUser;
	next();
});

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError(`You don't have permission to perform this action`, 403)
			);
		}
		next();
	};
};

exports.updatePassword = catchAsync(async (req, res, next) => {
	const user = await UserRepo.findById(req.user.id);

	if (!(await correctPassword(req.body.passwordCurrent, user.password))) {
		return next(new AppError(`Your current password is wrong`, 401));
	}

	const saltedPassword = await bcrypt.hash(req.body.password, 12);

	await pool.query(
		`
			UPDATE users
			SET password = $1, passwordChangedAt = CURRENT_TIMESTAMP
			WHERE id = $2
		`,
		[saltedPassword, req.user.id]
	);

	createAndSendToken(user, 200, res);
});
