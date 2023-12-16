const express = require('express');
const globalErrorHandler = require('../src/controllers/errorControllers');
const AppError = require('../src/utils/appError');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const cartRouter = require('./routes/cartRoutes');
const buyRouter = require('./routes/buyRoutes');
const { webhookCheckout } = require('./controllers/buyControllers');

module.exports = () => {
	const app = express();

	app.use(
		cors({
			origin: '*',
			credentials: true,
		})
	);

	// app.use(express.json());

	app.use((req, res, next) => {
		console.log('🚓🚓🚙🚙');
		next();
	});
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}

	app.post(
		'/webhook-checkout',
		bodyParser.raw({ type: 'application/json' }),
		webhookCheckout
	);

	app.use(cookieParser());
	app.use(express.json({ limit: '10kb' }));

	app.use('/api/v1/users', userRouter);
	app.use('/api/v1/products', productRouter);
	app.use('/api/v1/review', reviewRouter);
	app.use('/api/v1/cart', cartRouter);
	app.use('/api/v1/buy', buyRouter);

	app.all('*', (req, res, next) => {
		next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
	});

	app.use(globalErrorHandler);

	return app;
};
