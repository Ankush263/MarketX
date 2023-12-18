import { createSlice } from '@reduxjs/toolkit';

export interface TokenSlice {
	value: string | null;
}

const initialTokenState: TokenSlice = {
	value: JSON.parse(localStorage.getItem('Token') as string)
		? JSON.parse(localStorage.getItem('Token') as string).value
		: null,
};

export const tokenSlice = createSlice({
	name: 'jwttoken',
	initialState: initialTokenState,
	reducers: {},
});

export default tokenSlice.reducer;
