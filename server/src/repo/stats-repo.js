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

	static async todaysRevenew(user_id) {
		const { rows } = await pool.query(
			`
        SELECT COALESCE(SUM(quantity * products.price), 0) AS sum FROM buy
        JOIN products ON products.id = buy.product_id
        WHERE products.user_id = $1 AND DATE(buy.created_at) = CURRENT_DATE;
      `,
			[user_id]
		);
		return toCamelCase(rows)[0];
	}

	static async yesterdaysRevenew(user_id) {
		const { rows } = await pool.query(
			`
        SELECT COALESCE(SUM(quantity * products.price), 0) AS sum FROM buy
        JOIN products ON products.id = buy.product_id
        WHERE products.user_id = $1 AND DATE(buy.created_at) = CURRENT_DATE - INTERVAL '1 day'
      `,
			[user_id]
		);
		return toCamelCase(rows)[0];
	}

	static async pastSevenDaysRevenew(user_id) {
		const { rows } = await pool.query(
			`
				SELECT date_sequence.date_val AS sale_date,
				COALESCE(SUM(s.total_price), 0) AS total_sales,
						TO_CHAR(date_sequence.date_val, 'Day') AS week_name
				FROM (
					SELECT generate_series(CURRENT_DATE - INTERVAL '6 days', CURRENT_DATE, INTERVAL '1 day')::DATE AS date_val
				) date_sequence
				LEFT JOIN (
					SELECT DATE(b.created_at) AS trans_date, b.quantity * p.price AS total_price
					FROM buy b
					JOIN products p ON p.id = b.product_id
					WHERE p.user_id = $1
				) AS s ON date_sequence.date_val = s.trans_date
				GROUP BY date_sequence.date_val
				ORDER BY sale_date;
      `,
			[user_id]
		);
		return toCamelCase(rows);
	}

	static async revenewPercent(user_id) {
		const { rows } = await pool.query(
			`
        WITH RevenueData AS (
          SELECT
              SUM(CASE WHEN DATE(b.created_at) = CURRENT_DATE THEN b.quantity * p.price ELSE 0 END) AS today_revenue,
              SUM(CASE WHEN DATE(b.created_at) = CURRENT_DATE - INTERVAL '1 day' THEN b.quantity * p.price ELSE 0 END) AS previous_revenue
          FROM buy b
          JOIN products p ON p.id = b.product_id
          WHERE p.user_id = $1
        )
        SELECT
            CASE WHEN previous_revenue <> 0 THEN CAST((previous_revenue - today_revenue) / 100.0 AS FLOAT) ELSE NULL END AS percentage_change
        FROM RevenueData;
      `,
			[user_id]
		);
		return toCamelCase(rows)[0];
	}

	static async productBasedOnTags(tag, user_id) {
		const { rows } = await pool.query(
			`
        SELECT *
        FROM products
        WHERE array_to_string(tags, ',') LIKE '%' || $1 || '%' AND user_id = $2;
        `,
			[tag, user_id]
		);
		return toCamelCase(rows);
	}

	static async totalProductInCart(user_id) {
		const { rows } = await pool.query(
			`
        SELECT SUM(quantity) AS total_in_cart FROM cart
        JOIN products ON products.id = cart.product_id
        WHERE products.user_id = $1;
      `,
			[user_id]
		);
		return toCamelCase(rows)[0];
	}

	static async totalProductSell(user_id) {
		const { rows } = await pool.query(
			`
        SELECT SUM(quantity) AS total_sell FROM buy
        JOIN products ON products.id = buy.product_id
        WHERE products.user_id = $1;
      `,
			[user_id]
		);
		return toCamelCase(rows)[0];
	}

	static async productSaleBasedOntags(user_id) {
		const { rows } = await pool.query(
			`
				SELECT 
					SUM(CASE WHEN array_to_string(tags, ',') LIKE '%toy%' THEN quantity ELSE 0 END) AS toy,
					SUM(CASE WHEN array_to_string(tags, ',') LIKE '%new%' THEN quantity ELSE 0 END) AS new,
					SUM(CASE WHEN array_to_string(tags, ',') LIKE '%sale%' THEN quantity ELSE 0 END) AS sale,
					SUM(CASE WHEN array_to_string(tags, ',') LIKE '%exclusive%' THEN quantity ELSE 0 END) AS exclusive
				FROM
					(SELECT quantity, tags FROM buy
					JOIN products ON products.id = buy.product_id
				WHERE products.user_id = $1) AS p
      `,
			[user_id]
		);
		return toCamelCase(rows)[0];
	}
}
module.exports = StatsRepo;
