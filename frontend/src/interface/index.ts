export interface CartItemInterface {
	id: number;
	productid: number;
	company: string;
	image: string[];
	name: string;
	price: number;
	quantity: number;
	subTotal: number;
	userId: number;
}

export interface ProductInterface {
	id: number;
	name: string;
	description: string;
	image: string[];
	company: string;
	price: number;
	weight: string;
	ratings: number;
	tags: string[];
	type: string;
}
