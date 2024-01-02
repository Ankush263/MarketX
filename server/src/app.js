const express = require('express');
const globalErrorHandler = require('../src/controllers/errorControllers');
const AppError = require('../src/utils/appError');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const cartRouter = require('./routes/cartRoutes');
const buyRouter = require('./routes/buyRoutes');
const statsRouter = require('./routes/statsRoutes');
const customQueryRouter = require('./routes/customQueryRoutes');
const { webhookCheckout } = require('./controllers/buyControllers');
const path = require('path');

module.exports = () => {
	const app = express();

	app.use(
		cors({
			origin: '*',
			credentials: true,
		})
	);

	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');

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
	app.use(xss());

	app.use('/api/v1/users', userRouter);
	app.use('/api/v1/products', productRouter);
	app.use('/api/v1/review', reviewRouter);
	app.use('/api/v1/cart', cartRouter);
	app.use('/api/v1/buy', buyRouter);
	app.use('/api/v1/stats', statsRouter);
	app.use('/api/v1/customQuery', customQueryRouter);

	app.get('/checkout', (req, res) => {
		res.render('checkoutSuccess');
	});

	app.all('*', (req, res, next) => {
		next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
	});

	app.use(globalErrorHandler);

	return app;
};
