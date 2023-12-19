import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
	overview: boolean;
	uploadProducts: boolean;
	myProduct: boolean;
	orderHistory: boolean;
	customQuery: boolean;
	myAccount: boolean;
}

const initialState: NavigationState = {
	overview: true,
	uploadProducts: false,
	myProduct: false,
	orderHistory: false,
	customQuery: false,
	myAccount: false,
};

const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setNavigationState(state, action: PayloadAction<string>) {
			state.overview = action.payload === 'overview' ? true : false;
			state.uploadProducts = action.payload === 'uploadProducts' ? true : false;
			state.myProduct = action.payload === 'myProduct' ? true : false;
			state.orderHistory = action.payload === 'orderHistory' ? true : false;
			state.customQuery = action.payload === 'customQuery' ? true : false;
			state.myAccount = action.payload === 'myAccount' ? true : false;

			// Reset other states to false
			if (action.payload !== 'overview') {
				state.overview = false;
			}
			if (action.payload !== 'uploadProducts') {
				state.uploadProducts = false;
			}
			if (action.payload !== 'myProduct') {
				state.myProduct = false;
			}
			if (action.payload !== 'orderHistory') {
				state.orderHistory = false;
			}
			if (action.payload !== 'customQuery') {
				state.customQuery = false;
			}
			if (action.payload !== 'myAccount') {
				state.myAccount = false;
			}
		},
	},
});

export const { setNavigationState } = navigationSlice.actions;
export default navigationSlice.reducer;
