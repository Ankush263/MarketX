const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class BuyRepo {
	static async createBuy(user_id, cart_id, payment_option, paid) {
		const { rows } = await pool.query(
			`
        INSERT INTO buy (user_id, cart_id, payment_option, paid)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `,
			[user_id, cart_id, payment_option, paid]
		);
		return toCamelCase(rows)[0];
	}

	static async buy(user_id, payment_option, paid) {
		try {
			const cartIdsQuery = await pool.query(
				`
					SELECT id
					FROM cart
					WHERE user_id = $1
        `,
				[user_id]
			);

			const cartIds = cartIdsQuery.rows.map((row) => row.id);

			if (cartIds.length === 0) {
				throw new Error('No cart items found for this user.');
			}

			const sub_total = (
				await pool.query(
					`
					SELECT SUM(price * quantity) AS sub_total
					FROM cart
					JOIN products ON products.id = cart.product_id
					WHERE cart.user_id = $1;
				`,
					[user_id]
				)
			).rows[0].sub_total;

			const buyQueries = cartIds.map(async (cart_id) => {
				const buyQuery = await pool.query(
					`
						INSERT INTO buy (user_id, cart_id, payment_option, paid, sub_total)
						VALUES ($1, $2, $3, $4, $5)
						RETURNING *
          `,
					[user_id, cart_id, payment_option, paid, sub_total]
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
					carts.id, 
					user_id, 
					name, 
					company, 
					image, 
					price, 
					type, 
					quantity AS order_quantity, 
					payment_option, 
					paid, 
					quantity * price AS sub_total 
				FROM buy
				JOIN (
				SELECT 
					cart.id, 
					product_id, 
					name, 
					company, 
					image, 
					price, 
					weight, 
					tags, 
					type, 
					quantity 
				FROM cart
				JOIN products ON products.id = cart.product_id
				) AS carts ON carts.id = buy.cart_id
				WHERE user_id = $1;
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
