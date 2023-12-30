import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	value: '',
};

const querySqlSlice = createSlice({
	name: 'query-sql',
	initialState,
	reducers: {
		setQuerySql: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
		resetQuerySql: (state) => {
			state.value = '';
		},
	},
});

export const { setQuerySql, resetQuerySql } = querySqlSlice.actions;

export default querySqlSlice.reducer;
