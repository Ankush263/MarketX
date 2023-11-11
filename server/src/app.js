const express = require('express');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('../src/controllers/errorControllers');
const AppError = require('../src/utils/appError');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

module.exports = () => {
	const app = express();

	app.use(express.json());

	app.use((req, res, next) => {
		console.log('🚓🚓🚙🚙');
		next();
	});
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}
	app.use(cookieParser());

	app.use('/api/v1/users', userRouter);

	app.all('*', (req, res, next) => {
		next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
	});

	app.use(globalErrorHandler);

	return app;
};
