const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class StatsRepo {
	static async totalNumberOfProducts(user_id) {
		const { rows } = await pool.query(
			`
        SELECT array_length(product_id, 1) AS total_products
        FROM business 
        WHERE user_id = $1;
      `,
			[user_id]
		);
		return toCamelCase(rows)[0];
	}

	static async totalRevenew(user_id) {
		const { rows } = await pool.query(
			`
        SELECT 
        SUM(price * quantity) AS total_sum
        FROM (
          SELECT 
            product_id, 
            transaction_id,  
            quantity,
            products.price,
            price * quantity AS total
          FROM buy
          JOIN products ON products.id = buy.product_id
          WHERE products.user_id = $1
        ) AS subquery;
      `,
			[user_id]
		);
		return toCamelCase(rows)[0];
	}

	static async totalNumberOfOrders(user_id) {
		const { rows } = await pool.query(
			`
        SELECT COUNT(*) FROM buy
        JOIN products ON products.id = buy.product_id
        WHERE products.user_id = $1;
      `,
			[user_id]
		);
		return toCamelCase(rows)[0];
	}
}
module.exports = StatsRepo;
