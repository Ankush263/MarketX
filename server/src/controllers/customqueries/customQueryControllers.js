const catchAsync = require('../../utils/catchAsync');
const { createCustomQuery } = require('./queries');
/*
  ALL queries
---------------
TODO: ALL JOINS

* users -> users
?  metrices -> min, max, unique
* products -> products & users
* buy -> buy, products & users

*/

/*
TODO: JOIN products & users

SELECT products.name AS products_name,
products.company AS products_company,
products.price AS products_price,
products.tags AS products_tags,
products.type AS products_type,
products.weight AS products_weight,
users.username AS users_username,
users.email AS users_email,
MAX(products.created_at) AS max_products_created_at,
MIN(products.created_at) AS min_products_created_at,
COUNT(products.id) AS total_products,
MIN(users.created_at) AS min_users_created_at
FROM products
LEFT OUTER JOIN users
ON users.id = products.user_id
GROUP BY 1, 2, 3, 4, 5, 6, 7, 8
*/

exports.usersDimensions = catchAsync(async (req, res, next) => {
	await createCustomQuery(req, res, next, 'users');
});

exports.productsDimensions = catchAsync(async (req, res, next) => {
	await createCustomQuery(req, res, next, 'products');
});

exports.buyDimensions = catchAsync(async (req, res, next) => {
	await createCustomQuery(req, res, next, 'buy');
});
