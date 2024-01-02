const BuyRepo = require('../repo/buy-repo');
const CartRepo = require('../repo/cart-repo');
const UserRepo = require('../repo/user-repo');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
	const cart = await CartRepo.getCart(req.user.id);
	const lineItems = cart.map((item) => ({
		price_data: {
			currency: 'usd',
			product_data: {
				name: item.name,
				images: [item.image[0]],
			},
			unit_amount: item.price * 100,
		},
		quantity: item.quantity,
	}));
	const customer = await stripe.customers.create({
		email: req.user.email,
	});
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		success_url: `${req.protocol}://${req.get(
			'host'
		)}/api/v1/buy/success?session_id={CHECKOUT_SESSION_ID}`,
		customer: customer.id,
		client_reference_id: req.user.id,
		mode: 'payment',
		line_items: lineItems,
	});

	res.status(200).json({
		status: 'success',
		session,
	});
});

const createCheckoutSession = async (session) => {
	const customerId = session.customer;
	const customer = await stripe.customers.retrieve(customerId);
	const user = await UserRepo.findByEmail(customer.email);
	const userId = user.id;
	await BuyRepo.buy(userId, session.id, 'card', 'true');
};

exports.webhookCheckout = (req, res, next) => {
	const signature = req.headers['stripe-signature'];

	console.log(req.body);
	console.log(JSON.stringify(req.body));

	let event;
	try {
		event = stripe.webhooks.constructEvent(
			JSON.stringify(req.body),
			signature,
			process.env.STRIPE_WEBHOOK_SECRET
		);
	} catch (err) {
		console.log(err);
		return res.status(400).send(`Webhook error: ${err.message}`);
	}

	switch (event.type) {
		case 'payment_intent.succeeded':
			const paymentIntentSucceeded = event.data.object;
			createCheckoutSession(paymentIntentSucceeded);
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
	}
	res.send();
};

exports.checkoutSuccess = catchAsync(async (req, res, next) => {
	const sessionId = req.query.session_id;
	if (!sessionId) {
		return next(new AppError(`Session Id does not exists`, 404));
	}
	const session = await stripe.checkout.sessions.retrieve(sessionId);
	if (!session) {
		return next(new AppError(`Session does not exists`, 404));
	}
	const customerName = session.customer_details.name || 'Unknown Customer';

	res.render('checkoutSuccess', {
		customerName,
	});
});

exports.createBuy = catchAsync(async (req, res, next) => {
	const { payment_option, paid } = req.body;
	const buy = await BuyRepo.buy(req.user.id, payment_option, paid);

	res.status(200).json({
		status: 'success',
		data: {
			buy,
		},
	});
});

exports.getMyBuy = catchAsync(async (req, res, next) => {
	const buy = await BuyRepo.getBuy(req.user.id);
	if (!buy) {
		return next(new AppError(`You don't have any buy items`, 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			buy,
		},
	});
});

exports.getOrderHistory = catchAsync(async (req, res, next) => {
	const history = await BuyRepo.orderHistory(req.user.id);

	res.status(200).json({
		status: 'success',
		data: {
			history,
		},
	});
});

exports.getTotal = catchAsync(async (req, res, next) => {
	const total = await BuyRepo.totalCount(req.user.id);
	if (!total) {
		return next(
			new AppError(
				`There seem to be some errors that occurred while trying to determine the total.`,
				404
			)
		);
	}

	res.status(200).json({
		status: 'success',
		data: {
			total,
		},
	});
});
