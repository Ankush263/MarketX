exports.usersMetrices = async (req, res, next, table) => {
	const query = req.query;

	let selectedFields;
	if (query.metrices) {
		selectedFields = query.metrices.split(', ');
	}
	if (query.toTable_metrices) {
		selectedFields = query.toTable_metrices.split(', ');
	}

	if (query.thirdTable_metrices) {
		selectedFields = query.thirdTable_metrices.split(', ');
	}

	let selectedElements = [];
	selectedFields.forEach((field, index) => {
		const comma = index !== selectedFields.length - 1 ? ',' : '';
		if (field === 'unique') {
			let tempQuery = `COUNT(DISTINCT ${table}.id) AS ${field}_${table}_count \n`;

			if (index !== selectedFields.length - 1) {
				tempQuery = `${tempQuery},`;
			}

			selectedElements.push(tempQuery);
		} else {
			selectedElements.push(
				`${field.toUpperCase()}(${table}.created_at) AS ${field}_${table}_created_at${comma} \n`
			);
		}
	});

	selectedElements = selectedElements.join(' ');

	return selectedElements;
};

exports.buyMetrices = async (req, res, next, table) => {
	const query = req.query;

	let selectedFields;
	if (query.metrices) {
		selectedFields = query.metrices.split(', ');
	}
	if (query.withTable_metrices) {
		selectedFields = query.withTable_metrices.split(', ');
	}

	let selectedElements = [];

	selectedFields.forEach((field, index) => {
		let tempQuery;

		if (field === 'buy_max') {
			tempQuery = `MAX(${table}.created_at) AS max_${table}_created_at \n`;
		}
		if (field === 'buy_min') {
			tempQuery = `MIN(${table}.created_at) AS min_${table}_created_at \n`;
		}
		if (field === 'buy_unique') {
			tempQuery = `COUNT(DISTINCT ${table}.transaction_id) AS unique_${table}_transaction_id \n`;
		}
		if (field === 'buy_total_transactions') {
			tempQuery = `COUNT(${table}.id) AS total_transaction_${table} \n`;
		}
		if (field === 'buy_total_quantity') {
			tempQuery = `SUM(${table}.quantity) AS sum_${table}_total_quantity \n`;
		}
		if (field === 'buy_total_completed_transaction') {
			tempQuery = `COUNT(${table}.paid) AS ${table}_total_completed_transaction \n`;
		}
		if (field === 'buy_unique_user_buy') {
			tempQuery = `COUNT(DISTINCT ${table}.user_id) AS unique_${table}_user_buy \n`;
		}

		if (index !== selectedFields.length - 1) {
			tempQuery = `${tempQuery},`;
		}

		selectedElements.push(tempQuery);
	});
	selectedElements = selectedElements.join(' ');
	return selectedElements;
};

exports.productsMetrices = async (req, res, next, table) => {
	const query = req.query;

	let selectedFields;
	if (query.metrices) {
		selectedFields = query.metrices.split(', ');
	}
	if (query.withTable_metrices) {
		selectedFields = query.withTable_metrices.split(', ');
	}

	if (req.url.startsWith('/joinBuyProductsUsers') && query.toTable_metrices) {
		selectedFields = query.toTable_metrices.split(', ');
	}

	let selectedElements = [];

	selectedFields.forEach((field, index) => {
		let tempQuery;

		if (field === 'product_max') {
			tempQuery = `MAX(${table}.created_at) AS max_${table}_created_at \n`;
		}
		if (field === 'product_min') {
			tempQuery = `MIN(${table}.created_at) AS min_${table}_created_at \n`;
		}
		if (field === 'product_total') {
			tempQuery = `COUNT(${table}.id) AS total_${table} \n`;
		}
		if (field === 'product_highest_price') {
			tempQuery = `MAX(${table}.price) AS ${table}_highest_price \n`;
		}
		if (field === 'product_lowest_price') {
			tempQuery = `MIN(${table}.price) AS ${table}_lowest_price \n`;
		}

		if (index !== selectedFields.length - 1) {
			tempQuery = `${tempQuery},`;
		}

		selectedElements.push(tempQuery);
	});
	selectedElements = selectedElements.join(' ');
	return selectedElements;
};
