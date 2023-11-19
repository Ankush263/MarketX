const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class ReviewRepo {
	static async find() {
		const { rows } = await pool.query('SELECT * FROM reviews');
		return toCamelCase(rows);
	}

	static async findById(id) {
		const { rows } = await pool.query('SELECT * FROM reviews WHERE id = $1', [
			id,
		]);
		return toCamelCase(rows)[0];
	}

	static async findByProductId(product_id) {
		const { rows } = await pool.query(
			'SELECT * FROM reviews WHERE product_id = $1',
			[product_id]
		);
		return toCamelCase(rows);
	}

	static async create(user_id, business_id, product_id, text, rating) {
		const { rows } = await pool.query(
			`
        INSERT INTO reviews (user_id, business_id, product_id, text, rating)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `,
			[user_id, business_id, product_id, text, rating]
		);
		return toCamelCase(rows)[0];
	}

	static async update(text, rating, id) {
		const { rows } = await pool.query(
			`
				UPDATE reviews
				SET text = $1, rating = $2
				WHERE id = $3
				RETURNING *;
			`,
			[text, rating, id]
		);
		return toCamelCase(rows)[0];
	}

	static async delete(id) {
		const { rows } = await pool.query(
			`
        DELETE FROM reviews
        WHERE id = $1
      `,
			[id]
		);
		return toCamelCase(rows);
	}
}

module.exports = ReviewRepo;
