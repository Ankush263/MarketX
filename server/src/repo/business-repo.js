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

	static async getMyBusinessProfile(user_id) {
		const { rows } = await pool.query(
			`
				SELECT
				users.username,
				users.id AS userId,
				users.avater,
				users.email,
				JSON_AGG(
						JSON_BUILD_OBJECT(
							'productName', products.name,
							'company', products.company,
							'description', products.description,
							'image', products.image,
							'price', products.price,
							'unit', products.unit,
							'stock', products.stock,
							'type', products.type
						)
					) AS products
				FROM users
				LEFT JOIN business ON business.user_id = users.id
				LEFT JOIN products ON products.business_id = business.id
				WHERE users.id = $1
				GROUP BY users.username, users.id, users.avater, users.email;
			`,
			[user_id]
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
