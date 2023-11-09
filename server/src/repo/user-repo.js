const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class UserRepo {
	static async find() {
		const { rows } = await pool.query('SELECT * FROM users');
		return toCamelCase(rows);
	}

	static async findById(id) {
		const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
			id,
		]);
		return toCamelCase(rows)[0];
	}

	static async create(username, avater, email, password, role) {
		const { rows } = await pool.query(
			`
        INSERT INTO users (username, avater, email, password, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `,
			[username, avater, email, password, role]
		);
		return toCamelCase(rows)[0];
	}

	static async findByIdAndUpdate(id, username, avater, email, role) {
		const { rows } = await pool.query(
			`
        UPDATE users
        SET username = $1, avater = $2, email = $3, role = $4
        WHERE id = $5
        RETURNING *;
      `,
			[username, avater, email, role, id]
		);
		return toCamelCase(rows)[0];
	}

	static async delete(id) {
		const { rows } = await pool.query(
			`
        DELETE FROM users
        WHERE id = $1
      `,
			[id]
		);
		return toCamelCase(rows);
	}

	static async count() {
		const { rows } = await pool.query('SELECT COUNT(*) FROM users;');
		return parseInt(rows[0].count);
	}
}

module.exports = UserRepo;
