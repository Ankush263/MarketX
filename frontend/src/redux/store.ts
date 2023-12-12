import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import tokenReducer from './jwt/tokenSlice';
import { productReducer, singleProductReducer } from './products/productSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		token: tokenReducer,
		product: productReducer,
		singleProduct: singleProductReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
