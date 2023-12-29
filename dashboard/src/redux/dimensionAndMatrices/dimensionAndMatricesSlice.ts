import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Item {
	name: string;
	metrices: boolean;
	table: string;
}

interface DimensionAndMetricesState {
	value: Item[];
}

const initialState: DimensionAndMetricesState = {
	value: [],
};

const dimensionAndMetricesSlice = createSlice({
	name: 'dimensions-metrices',
	initialState,
	reducers: {
		addToValue: (state, action: PayloadAction<Item>) => {
			state.value = [...state.value, action.payload];
		},
		removeFromValue: (state, action: PayloadAction<string>) => {
			state.value = state.value.filter((item) => item.name !== action.payload);
		},
		reset: (state) => {
			state.value = [];
		},
	},
});

export const { addToValue, removeFromValue, reset } =
	dimensionAndMetricesSlice.actions;

export default dimensionAndMetricesSlice.reducer;
