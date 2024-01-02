import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Chart {
	bar: boolean;
	horizontal_bar: boolean;
}

const initialChart: Chart = {
	bar: true,
	horizontal_bar: false,
};

const chartTypeSlice = createSlice({
	name: 'chart-type',
	initialState: initialChart,
	reducers: {
		setChart: (state, action: PayloadAction<string>) => {
			state.bar = action.payload === 'bar' ? true : false;
			state.horizontal_bar = action.payload === 'horizontal_bar' ? true : false;

			if (action.payload !== 'bar') {
				state.bar = false;
			}
			if (action.payload !== 'horizontal_bar') {
				state.horizontal_bar = false;
			}
		},
	},
});

export const { setChart } = chartTypeSlice.actions;
export default chartTypeSlice.reducer;
