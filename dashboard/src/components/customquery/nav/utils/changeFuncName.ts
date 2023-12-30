export const handleChangefuncName = (name: string): string => {
	if (name === 'User Id') {
		return 'id';
	}
	if (name === 'email' || name === 'username') {
		return name;
	}
	if (name === 'Date of most recent created user') {
		return 'max';
	}
	if (name === 'Date of first created user') {
		return 'min';
	}
	if (name === 'Unique user count') {
		return 'unique';
	}
	if (name === 'Product Id') {
		return 'id';
	}
	if (name === 'name') {
		return 'name';
	}
	if (name === 'company') {
		return 'company';
	}
	if (name === 'price') {
		return 'price';
	}
	if (name === 'type') {
		return 'type';
	}
	if (name === 'tag') {
		return 'tags';
	}
	if (name === 'weight') {
		return 'weight';
	}
	if (name === 'Date of most recent created product') {
		return 'product_max';
	}
	if (name === 'Date of first created product') {
		return 'product_min';
	}
	if (name === 'Total number of products') {
		return 'product_total';
	}
	if (name === 'Highest price') {
		return 'product_highest_price';
	}
	if (name === 'Lowest price') {
		return 'product_lowest_price';
	}
	if (name === 'Date of most recent Order') {
		return 'buy_max';
	}
	if (name === 'Date of first Order') {
		return 'buy_min';
	}
	if (name === 'Unique Orders') {
		return 'buy_unique';
	}
	if (name === 'Total number of transaction') {
		return 'buy_total_transactions';
	}
	if (name === 'Total quantity of ordered products') {
		return 'buy_total_quantity';
	}
	if (name === 'Total number of users orders') {
		return 'buy_unique_user_buy';
	}
	if (name === 'transaction id') {
		return 'transaction_id';
	}
	if (name === 'quantity' || name === 'sub_total') {
		return name;
	}

	return '';
};
