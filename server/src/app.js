const express = require('express');
const globalErrorHandler = require('../src/controllers/errorControllers');
const AppError = require('../src/utils/appError');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');

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
	app.use('/api/v1/products', productRouter);
	app.use('/api/v1/review', reviewRouter);

	app.all('*', (req, res, next) => {
		next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
	});

	app.use(globalErrorHandler);

	return app;
};
