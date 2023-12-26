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

	const { rows } = await pool.query(tempQuery);

	res.status(200).json({
		status: 'success',
		data: {
			data: toCamelCase(rows),
		},
		query: tempQuery,
	});
};

exports.createJoinQuery = async (req, res, next, withTable, toTable) => {
	const query = req.query;
	if (Object.keys(query).length === 0) {
		return next(new AppError(`Please select some elements`, 404));
	}

	let selectedElements = [];
	let group = '';

	const pushSelectedFields = (dimensionName, tableName) => {
		if (dimensionName) {
			const selectedFields = dimensionName.split(', ');

			selectedFields.forEach((field) => {
				selectedElements.push(`${tableName}.${field} AS ${tableName}_${field}`);
			});
		}
	};

	pushSelectedFields(query.withTable_dimension, withTable);
	pushSelectedFields(query.toTable_dimension, toTable);

	let select =
		selectedElements.length !== 0
			? `
		SELECT
		${selectedElements.join(', ')} \n
		`
			: 'SELECT \n';

	const joinQuery = `
	JOIN ${toTable}
	ON ${toTable}.id = ${withTable}.user_id \n
	`;

	const fromOption =
		!query.toTable_dimension && !query.toTable_metrices
			? `
	FROM ${withTable} \n
	`
			: `
	FROM ${withTable}
	${joinQuery} \n
	`;

	const length = selectedElements.length;

	if (length > 0) {
		group = Array.from({ length }, (_, i) => i + 1).join(', ');
	}

	const groupOption =
		selectedElements.length === 0
			? ''
			: `
	GROUP BY ${group}
	`;

	let metrices = [];

	if (query.withTable_metrices || query.toTable_metrices) {
		if (query.withTable_metrices) {
			metrices.push(await productsMetrices(req, res, next, withTable));
		}
		if (query.toTable_metrices) {
			metrices.push(await usersMetrices(req, res, next, toTable));
		}
	}

	const comma =
		metrices.length === 0 || selectedElements.length === 0 ? '' : ',';

	select = select + comma + metrices;

	let tempQuery = `
	SELECT
	FROM ${withTable}
	`;

	tempQuery = select + fromOption + groupOption;

	const { rows } = await pool.query(tempQuery);

	res.status(200).json({
		status: 'success',
		data: {
			data: toCamelCase(rows),
		},
		query: tempQuery,
	});
};

exports.createJoinQueryForbuyProductsAndUsers = async (
	req,
	res,
	next,
	withTable,
	toTable,
	thirdTable
) => {
	const query = req.query;

	if (Object.keys(query).length === 0) {
		return next(new AppError(`Please select some elements`, 404));
	}

	let selectedElements = [];
	let group = '';

	const pushSelectedFields = (dimensionName, tableName) => {
		if (dimensionName) {
			const selectedFields = dimensionName.split(', ');

			selectedFields.forEach((field) => {
				selectedElements.push(`${tableName}.${field} AS ${tableName}_${field}`);
			});
		}
	};

	pushSelectedFields(query.withTable_dimension, withTable);
	pushSelectedFields(query.toTable_dimension, toTable);
	pushSelectedFields(query.thirdTable_dimension, thirdTable);

	let select =
		selectedElements.length !== 0
			? `
		SELECT
		${selectedElements.join(', ')} \n
		`
			: 'SELECT \n';

	const firstJoinQuery = `
	LEFT OUTER JOIN ${toTable}
	ON ${toTable}.id = ${withTable}.product_id \n
	`;

	const secondJoinQuery = `
	LEFT OUTER JOIN ${thirdTable} 
	ON ${thirdTable}.id = ${toTable}.user_id \n
	`;

	let fromOption = '';

	if (query.toTable_dimension || query.toTable_metrices) {
		fromOption = `
		${firstJoinQuery}
		`;
	}
	if (query.thirdTable_dimension || query.thirdTable_metrices) {
		fromOption = `
		${firstJoinQuery}
		${secondJoinQuery}
		`;
	}

	const length = selectedElements.length;

	if (length > 0) {
		group = Array.from({ length }, (_, i) => i + 1).join(', ');
	}

	const groupOption =
		selectedElements.length === 0
			? ''
			: `
	GROUP BY ${group}
	`;

	let metrices = [];

	if (
		query.withTable_metrices ||
		query.toTable_metrices ||
		query.thirdTable_metrices
	) {
		if (query.withTable_metrices) {
			metrices.push(await buyMetrices(req, res, next, withTable));
		}
		if (query.toTable_metrices) {
			metrices.push(await productsMetrices(req, res, next, toTable));
		}
		if (query.thirdTable_metrices) {
			metrices.push(await usersMetrices(req, res, next, thirdTable));
		}
	}

	const comma =
		metrices.length === 0 || selectedElements.length === 0 ? '' : ',';

	select = select + comma + metrices;

	let tempQuery = `
	SELECT
	FROM ${withTable}
	`;

	tempQuery = select + 'FROM buy' + fromOption + groupOption;

	const { rows } = await pool.query(tempQuery);

	res.status(200).json({
		status: 'success',
		data: {
			data: toCamelCase(rows),
		},
		query: tempQuery,
	});
};
