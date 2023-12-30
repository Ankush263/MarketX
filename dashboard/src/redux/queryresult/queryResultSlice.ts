import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	value: [{}],
};

const queryResultSlice = createSlice({
	name: 'result',
	initialState,
	reducers: {
		setQueryResult: (state, action: PayloadAction<object[]>) => {
			state.value = [action.payload];
		},
		resetQueryResult: (state) => {
			state.value = [];
		},
	},
});

export const { setQueryResult, resetQueryResult } = queryResultSlice.actions;

export default queryResultSlice.reducer;
