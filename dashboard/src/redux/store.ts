import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './jwt/tokenSlice';
import componentReducer from './component/componentSlice';
import dimensionAndMatricesReducer from './dimensionAndMatrices/dimensionAndMatricesSlice';
import queryResultReducer from './queryresult/queryResultSlice';
import querySqlReducer from './querySql/querySqlSlice';
import chartTypeReducer from './chart-type/chart-typeSlice';
import loadReducer from './load/loadSlice';

export const store = configureStore({
	reducer: {
		token: tokenReducer,
		component: componentReducer,
		dimensionAndMetrices: dimensionAndMatricesReducer,
		queryResult: queryResultReducer,
		querySql: querySqlReducer,
		chartType: chartTypeReducer,
		load: loadReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
