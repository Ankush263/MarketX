const AppError = require('../../utils/appError');
const pool = require('../../pool');
const toCamelCase = require('../../repo/utils/to-camel-case');
const { usersMetrices, buyMetrices, productsMetrices } = require('./metrics');

exports.createCustomQuery = async (req, res, next, table) => {
	const query = req.query;

	if (Object.keys(query).length === 0) {
		return next(new AppError(`Please select some elements`, 404));
	}

	let tempQuery = `
		SELECT
		FROM ${table}
	`;
	let selectedElements = [];
	let group = '';

	if (query.dimension) {
		const selectedFields = query.dimension.split(', ');

		selectedFields.forEach((field, index) => {
			const comma = index !== selectedFields.length - 1 ? ',' : '';
			selectedElements.push(`${table}.${field} AS ${table}_${field}${comma}`);
		});

		const length = selectedElements.length;
		selectedElements = selectedElements.join('\n');
		if (length > 0) {
			group = Array.from({ length }, (_, i) => i + 1).join(', ');
		}

		const select = selectedElements
			? `
		SELECT
		${selectedElements} \n
		`
			: 'SELECT \n';
		const from = `FROM ${table} \n`;
		const groupOption = group.length !== 0 ? `GROUP BY ${group}` : '';

		tempQuery = select + from + groupOption;
	}

	let metrices;
	const select =
		selectedElements.length !== 0
			? `SELECT ${selectedElements}, \n`
			: 'SELECT \n';
	const tableOption = `FROM ${table} \n`;
	const groupOption = selectedElements.length !== 0 ? `GROUP BY ${group}` : '';

	if (query.metrices) {
		if (table === 'users') {
			metrices = await usersMetrices(req, res, next, table);
		}
		if (table === 'buy') {
			metrices = await buyMetrices(req, res, next, table);
		}
		if (table === 'products') {
			metrices = await productsMetrices(req, res, next, table);
		}
		tempQuery = select + metrices + tableOption + groupOption;
	}

	// let joinQuery = '';
	// if (query.join) {
	// 	if (table === 'products') {
	// 		const joinOn = query.join;
	// 		joinQuery = `
	// 		LEFT OUTER JOIN ${joinOn}
	// 		ON ${joinOn}.id = ${table}.user_id \n
	// 		`;
	// 	}
	// 	tempQuery = select + metrices + tableOption + joinQuery + groupOption;
	// }

	console.log(tempQuery);

	const { rows } = await pool.query(tempQuery);

	res.status(200).json({
		status: 'success',
		data: {
			data: toCamelCase(rows),
		},
		query: tempQuery,
	});
};
