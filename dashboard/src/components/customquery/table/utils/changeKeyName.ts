export const handleChangeKeyName = (name: string): string => {
	if (name === 'Date of most recent created user') {
		return 'maxUsersCreatedAt';
	}
	if (name === 'Date of first created user') {
		return 'minUsersCreatedAt';
	}
	if (name === 'Unique user count') {
		return 'uniqueUsersCount';
	}
	if (name === 'User Id') {
		return 'usersId';
	}
	if (name === 'email') {
		return 'usersEmail';
	}
	if (name === 'username') {
		return 'usersUsername';
	}
	if (name === 'Product Id') {
		return 'productsId';
	}
	if (name === 'name') {
		return 'productsName';
	}
	if (name === 'company') {
		return 'productsCompany';
	}
	if (name === 'price') {
		return 'productsPrice';
	}
	if (name === 'type') {
		return 'productsType';
	}
	if (name === 'tag') {
		return 'productsTags';
	}
	if (name === 'weight') {
		return 'productsWeight';
	}
	if (name === 'Date of most recent created product') {
		return 'maxProductsCreatedAt';
	}
	if (name === 'Date of first created product') {
		return 'minProductsCreatedAt';
	}
	if (name === 'Total number of products') {
		return 'totalProducts';
	}
	if (name === 'Highest price') {
		return 'productsHighestPrice';
	}
	if (name === 'Lowest price') {
		return 'productsLowestPrice';
	}
	if (name === 'transaction id') {
		return 'buyTransactionId';
	}
	if (name === 'quantity') {
		return 'buyQuantity';
	}
	if (name === 'sub_total') {
		return 'buySubTotal';
	}
	if (name === 'Date of most recent Order') {
		return 'maxBuyCreatedAt';
	}
	if (name === 'Date of first Order') {
		return 'minBuyCreatedAt';
	}
	if (name === 'Unique Orders') {
		return 'uniqueBuyTransactionId';
	}
	if (name === 'Total number of transaction') {
		return 'totalTransactionBuy';
	}
	if (name === 'Total quantity of ordered products') {
		return 'sumBuyTotalQuantity';
	}
	if (name === 'Total number of users orders') {
		return 'uniqueBuyUserBuy';
	}

	return '';
};
