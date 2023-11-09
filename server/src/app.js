const express = require('express');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('../src/controllers/errorControllers');
const AppError = require('../src/utils/appError');

module.exports = () => {
	const app = express();

	app.use(express.json());
	app.use('/api/v1/users', userRouter);

	app.all('*', (req, res, next) => {
		next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
	});

	app.use(globalErrorHandler);

	return app;
};
