const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class BusinessRepo {
	static async find() {
		const { rows } = await pool.query('SELECT * FROM business');
		return toCamelCase(rows);
	}

	static async findByUserId(id) {
		const { rows } = await pool.query(
			'SELECT * FROM business WHERE user_id = $1',
			[id]
		);
		return toCamelCase(rows)[0];
	}

	static async create(user_id) {
		const { rows } = await pool.query(
			`
        INSERT INTO business (user_id)
        VALUES ($1)
        RETURNING *;
      `,
			[user_id]
		);
		return toCamelCase(rows)[0];
	}

	static async addProductId(product_id, user_id) {
		const { rows } = await pool.query(
			`
				UPDATE business
				SET product_id = array_append(product_id, $1)
				WHERE user_id = $2
				RETURNING *;
			`,
			[product_id, user_id]
		);
		return toCamelCase(rows);
	}

	static async removeProductId(product_id, user_id) {
		const { rows } = await pool.query(
			`
				UPDATE business
				SET product_id = array_remove(product_id, $1)
				WHERE user_id = $2
				RETURNING *;
			`,
			[product_id, user_id]
		);
		return toCamelCase(rows);
	}

	static async delete(id) {
		const { rows } = await pool.query(
			`
				DELETE FROM business
				WHERE user_id = $1;
			`,
			[id]
		);
		return toCamelCase(rows);
	}
}

module.exports = BusinessRepo;
