const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');
const CartRepo = require('./cart-repo');

class BuyRepo {
	static async buy(user_id, transaction_id, payment_option, paid) {
		try {
			const cartItemsQuery = await pool.query(
				`
					SELECT *
					FROM cart
					WHERE user_id = $1
			`,
				[user_id]
			);

			const cartItems = cartItemsQuery.rows;

			if (cartItems.length === 0) {
				throw new Error('No cart items found for this user.');
			}

			const sub_total = (
				await pool.query(
					`
						SELECT SUM(price * quantity) AS sub_total
						FROM cart
						JOIN products ON products.id = cart.product_id
						WHERE cart.user_id = $1
				`,
					[user_id]
				)
			).rows[0].sub_total;

			const buyQueries = cartItems.map(async (cartItem) => {
				const { product_id, quantity } = cartItem;

				const buyQuery = await pool.query(
					`
						INSERT INTO buy (user_id, product_id, transaction_id, quantity, payment_option, paid, sub_total)
						VALUES ($1, $2, $3, $4, $5, $6, $7)
						RETURNING *
				`,
					[
						user_id,
						product_id,
						transaction_id,
						quantity,
						payment_option,
						paid,
						sub_total,
					]
				);
				return buyQuery.rows[0];
			});

			const buyResults = await Promise.all(buyQueries);
			const camelCaseResults = toCamelCase(buyResults);

			return camelCaseResults;
		} catch (error) {
			console.error('Error in buy function:', error.message);
			throw error;
		}
	}

	static async getBuy(user_id) {
		const { rows } = await pool.query(
			`
			SELECT 
				buy.user_id, 
				name, 
				company, 
				image, 
				price, 
				type, 
				quantity AS order_quantity, 
				payment_option, 
				paid, 
				quantity * price AS sub_total, 
				sub_total AS total_order_price 
			FROM buy
			JOIN products ON products.id = buy.product_id
			WHERE buy.user_id = $1;
			`,
			[user_id]
		);
		return toCamelCase(rows);
	}

	static async totalCount(user_id) {
		const { rows } = await pool.query(
			`
				SELECT SUM(quantity * price) AS total FROM buy
				JOIN (
				SELECT cart.id, price, quantity FROM cart
				JOIN products ON products.id = cart.product_id
				) AS carts ON carts.id = buy.cart_id
				WHERE user_id = $1;
			`,
			[user_id]
		);
		return toCamelCase(rows)[0];
	}
}

module.exports = BuyRepo;
