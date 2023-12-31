export const reverseChangeKeyName = (value: string): string => {
	switch (value) {
		case 'maxUsersCreatedAt':
			return 'Date of most recent created user';
		case 'minUsersCreatedAt':
			return 'Date of first created user';
		case 'uniqueUsersCount':
			return 'Unique user count';
		case 'usersId':
			return 'User Id';
		case 'usersEmail':
			return 'email';
		case 'usersUsername':
			return 'username';
		case 'productsId':
			return 'Product Id';
		case 'productsName':
			return 'name';
		case 'productsCompany':
			return 'company';
		case 'productsPrice':
			return 'price';
		case 'productsType':
			return 'type';
		case 'productsTags':
			return 'tag';
		case 'productsWeight':
			return 'weight';
		case 'maxProductsCreatedAt':
			return 'Date of most recent created product';
		case 'minProductsCreatedAt':
			return 'Date of first created product';
		case 'totalProducts':
			return 'Total number of products';
		case 'productsHighestPrice':
			return 'Highest price';
		case 'productsLowestPrice':
			return 'Lowest price';
		case 'buyTransactionId':
			return 'transaction id';
		case 'buyQuantity':
			return 'quantity';
		case 'buySubTotal':
			return 'sub_total';
		case 'maxBuyCreatedAt':
			return 'Date of most recent Order';
		case 'minBuyCreatedAt':
			return 'Date of first Order';
		case 'uniqueBuyTransactionId':
			return 'Unique Orders';
		case 'totalTransactionBuy':
			return 'Total number of transaction';
		case 'sumBuyTotalQuantity':
			return 'Total quantity of ordered products';
		case 'uniqueBuyUserBuy':
			return 'Total number of users orders';
		default:
			return '';
	}
};
