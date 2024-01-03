import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Load {
	value: boolean;
}

const initialValue: Load = {
	value: false,
};

const loadSlice = createSlice({
	name: 'load',
	initialState: initialValue,
	reducers: {
		setLoad: (state, action: PayloadAction<boolean>) => {
			state.value = action.payload;
		},
	},
});

export const { setLoad } = loadSlice.actions;
export default loadSlice.reducer;
