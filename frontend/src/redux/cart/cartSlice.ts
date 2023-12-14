import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface OpenCart {
	value: boolean;
}

const initialOpenCart: OpenCart = {
	value: false,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState: initialOpenCart,
	reducers: {
		setOpenCart: (state, action: PayloadAction<boolean>) => {
			state.value = action.payload;
		},
	},
});

export const { setOpenCart } = cartSlice.actions;

export default cartSlice.reducer;
