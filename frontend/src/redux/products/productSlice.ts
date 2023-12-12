import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Product {
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

export interface ProductsState {
	value: Product[];
}

export interface SingleProductInterface {
	value: Product;
}

const product = {
	id: 0,
	name: '',
	description: '',
	image: [''],
	company: '',
	weight: '',
	price: 0,
	ratings: 0,
	tags: [''],
	type: '',
};

const initialProductsState: ProductsState = {
	value: [product],
};

const initialSingleProductState: SingleProductInterface = {
	value: product,
};

export const productSlice = createSlice({
	name: 'products',
	initialState: initialProductsState,
	reducers: {
		setProduct: (state, action: PayloadAction<Product[]>) => {
			state.value = action.payload;
		},
	},
});

export const singleProductSlice = createSlice({
	name: 'singleProduct',
	initialState: initialSingleProductState,
	reducers: {
		setSingleProduct: (state, action: PayloadAction<Product>) => {
			state.value = action.payload;
		},
	},
});

export const { setProduct: setProductAction } = productSlice.actions;
export const { setSingleProduct: setSingleProductAction } =
	singleProductSlice.actions;

export const productReducer = productSlice.reducer;
export const singleProductReducer = singleProductSlice.reducer;
