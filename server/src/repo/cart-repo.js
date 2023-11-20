const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class CartRepo {
	static async findByUserId(userId) {
		const { rows } = await pool.query('SELECT * FROM cart WHERE user_id = $1', [
			userId,
		]);
		return toCamelCase(rows);
	}

	static async findById(id) {
		const { rows } = await pool.query('SELECT * FROM cart WHERE id = $1', [id]);
		return toCamelCase(rows)[0];
	}

	static async create(userId, productId, quantity) {
		const { rows } = await pool.query(
			`
        INSERT INTO cart (user_id, product_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
			[userId, productId, quantity]
		);
		return toCamelCase(rows)[0];
	}

	static async addToCart(userId, productId) {
		const existingCart = await pool.query(
			`
				SELECT * FROM cart
				WHERE user_id = $1 AND product_id = $2
			`,
			[userId, productId]
		);

		if (existingCart.rows.length > 0) {
			const updatedCart = await pool.query(
				`
					UPDATE cart
					SET quantity = quantity + 1, updated_at = CURRENT_TIMESTAMP
					WHERE user_id = $1 AND product_id = $2
					RETURNING *;
				`,
				[userId, productId]
			);
			return toCamelCase(updatedCart.rows);
		} else {
			const newCart = await pool.query(
				`
					INSERT INTO cart (user_id, product_id)
					VALUES ($1, $2)
					RETURNING *;
				`,
				[userId, productId]
			);
			return toCamelCase(newCart.rows);
		}
	}

	static async removeFromCart(userId, productId) {
		const existingCart = await pool.query(
			`
				SELECT * FROM cart
				WHERE user_id = $1 AND product_id = $2
			`,
			[userId, productId]
		);

		if (existingCart.rows.length > 0) {
			const currentQuantity = existingCart.rows[0].quantity;

			if (currentQuantity > 1) {
				const updatedCart = await pool.query(
					`
						UPDATE cart
						SET quantity = quantity - 1, updated_at = CURRENT_TIMESTAMP
						WHERE user_id = $1 AND product_id = $2
						RETURNING *;
					`,
					[userId, productId]
				);
				return toCamelCase(updatedCart.rows);
			} else {
				const removedCart = await pool.query(
					`
						DELETE FROM cart
						WHERE user_id = $1 AND product_id = $2
						RETURNING *;
					`,
					[userId, productId]
				);
				return toCamelCase(removedCart.rows);
			}
		} else {
			return null;
		}
	}

	static async getCart(userId) {
		const { rows } = await pool.query(
			`
				SELECT cart.id, cart.user_id, name, image, company, price, quantity, price * quantity AS sub_total
				FROM cart
				JOIN products ON products.id = cart.product_id
				WHERE cart.user_id = $1;
			`,
			[userId]
		);
		return toCamelCase(rows);
	}

	static async getTotal(userId) {
		const { rows } = await pool.query(
			`
				SELECT SUM(price * quantity) AS total_amount
				FROM cart
				JOIN products ON products.id = cart.product_id
				WHERE cart.user_id = $1;
			`,
			[userId]
		);
		return toCamelCase(rows)[0];
	}

	static async delete(id) {
		const { rows } = await pool.query(
			`
				DELETE FROM cart
				WHERE id = $1
			`,
			[id]
		);
		return toCamelCase(rows);
	}
}

module.exports = CartRepo;
