import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
	value: boolean;
}

const initialAuthState: AuthState = {
	value: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialAuthState,
	reducers: {
		setLogin: (state, action: PayloadAction<boolean>) => {
			state.value = action.payload;
		},
	},
});

export const { setLogin } = authSlice.actions;

export default authSlice.reducer;
