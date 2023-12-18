import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './jwt/tokenSlice';
import componentReducer from './component/componentSlice';

export const store = configureStore({
	reducer: {
		token: tokenReducer,
		component: componentReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
