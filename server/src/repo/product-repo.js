const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class ProductRepo {
	static async find() {
		const { rows } = await pool.query('SELECT * FROM products');
		return toCamelCase(rows);
	}

	static async findById(id) {
		const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [
			id,
		]);
		return toCamelCase(rows)[0];
	}

	static async create(
		name,
		company,
		description,
		image,
		price,
		stock,
		unit,
		type,
		user_id
	) {
		const { rows } = await pool.query(
			`
				INSERT INTO products (name, company, description, image, price, stock, unit, type, user_id)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
				RETURNING *;
			`,
			[name, company, description, image, price, stock, unit, type, user_id]
		);
		return toCamelCase(rows)[0];
	}

	static async findByIdAndUpdate(
		id,
		name,
		company,
		image,
		price,
		stock,
		unit,
		type
	) {
		const { rows } = await pool.query(
			`
				UPDATE products
				SET name = $1, company = $2, image = $3, price = $4, stock = $5, unit = $6, type = $7
				WHERE id = $8
				RETURNING *;
			`,
			[name, company, image, price, stock, unit, type, id]
		);
		return toCamelCase(rows)[0];
	}

	static async delete(id) {
		const { rows } = await pool.query(
			`
				DELETE FROM products
				WHERE id = $1
			`,
			[id]
		);
		return toCamelCase(rows);
	}
}

module.exports = ProductRepo;
