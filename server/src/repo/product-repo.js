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
		tags,
		weight,
		type,
		user_id,
		business_id
	) {
		const { rows } = await pool.query(
			`
				INSERT INTO products (name, company, description, image, price, tags, weight, type, user_id, business_id)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
				RETURNING *;
			`,
			[
				name,
				company,
				description,
				image,
				price,
				tags,
				weight,
				type,
				user_id,
				business_id,
			]
		);
		return toCamelCase(rows)[0];
	}

	static async findByIdAndUpdate(
		id,
		name,
		company,
		description,
		price,
		tags,
		weight,
		type
	) {
		const { rows } = await pool.query(
			`
			UPDATE products
			SET
				name = COALESCE($1, name),
				company = COALESCE($2, company),
				description = COALESCE($3, description),
				price = COALESCE($4, price),
				tags = COALESCE($5, tags),
				weight = COALESCE($6, weight),
				type = COALESCE($7, type)
			WHERE id = $8
			RETURNING *;
			`,
			[name, company, description, price, tags, weight, type, id]
		);
		return toCamelCase(rows)[0];
	}

	static async findByIdAndUpdateImage(image, id) {
		const { rows } = await pool.query(
			`
				UPDATE products
				SET image = $1
				WHERE id = $2
				RETURNING *;
			`,
			[image, id]
		);
		return toCamelCase(rows)[0];
	}

	static async findByUserId(id) {
		const { rows } = await pool.query(
			`
				SELECT * FROM products WHERE user_id = $1;
			`,
			[id]
		);
		return toCamelCase(rows);
	}

	static async searchProductsByName(searchTerm) {
		const { rows } = await pool.query(
			`
				SELECT * FROM products WHERE name ILIKE $1;
			`,
			[`%${searchTerm}%`]
		);
		return toCamelCase(rows);
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
