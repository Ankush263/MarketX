import { Button, Tooltip } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getToken } from '../../../token';
import {
	getUsersMetricesAndDimensions,
	getProductsAndUsersMetricesAndDimensions,
	getJoinBuyProductsUsersMetricesAndDimensions,
} from '../../../api';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import { handleChangefuncName } from './utils/changeFuncName';
import { setQueryResult } from '../../../redux/queryresult/queryResultSlice';
import { setQuerySql } from '../../../redux/querySql/querySqlSlice';

interface ParamsInterface {
	tableName: string;
}

function RunQueryBtn() {
	const metricesAndDimensions = useSelector(
		(state: RootState) => state.dimensionAndMetrices.value
	);
	const params: ParamsInterface = useParams();
	const dispatch = useDispatch();
	const token = getToken();
	const disabled =
		params.tableName === 'users' ||
		params.tableName === 'products' ||
		params.tableName === 'buy';

	const handleRunUsersQuery = async () => {
		try {
			const metrices: string[] = [];
			const dimensions: string[] = [];
			metricesAndDimensions.forEach((item) => {
				if (item.metrices) {
					metrices.push(handleChangefuncName(item.name));
				} else {
					dimensions.push(handleChangefuncName(item.name));
				}
			});

			const res = await getUsersMetricesAndDimensions(
				token,
				metrices,
				dimensions
			);
			dispatch(setQueryResult(res.data.data.data));
			dispatch(setQuerySql(res.data.query));
		} catch (error) {
			console.log(error);
		}
	};

	const handleRunJoinProductAndUserQuery = async () => {
		try {
			const withTable_dimension: string[] = [];
			const withTable_metrices: string[] = [];
			const toTable_dimension: string[] = [];
			const toTable_metrices: string[] = [];

			metricesAndDimensions.forEach((item) => {
				if (item.metrices) {
					if (item.table === 'products') {
						withTable_metrices.push(handleChangefuncName(item.name));
					}
					if (item.table === 'users') {
						toTable_metrices.push(handleChangefuncName(item.name));
					}
				} else {
					if (item.table === 'products') {
						withTable_dimension.push(handleChangefuncName(item.name));
					}
					if (item.table === 'users') {
						toTable_dimension.push(handleChangefuncName(item.name));
					}
				}
			});

			const res = await getProductsAndUsersMetricesAndDimensions(
				token,
				withTable_dimension,
				withTable_metrices,
				toTable_dimension,
				toTable_metrices
			);

			dispatch(setQueryResult(res.data.data.data));
			dispatch(setQuerySql(res.data.query));
		} catch (error) {
			console.log(error);
		}
	};

	const handleJoinBuyUsersProducts = async () => {
		try {
			const withTable_dimension: string[] = [];
			const withTable_metrices: string[] = [];
			const toTable_dimension: string[] = [];
			const toTable_metrices: string[] = [];
			const thirdTable_dimension: string[] = [];
			const thirdTable_metrices: string[] = [];

			metricesAndDimensions.forEach((item) => {
				if (item.metrices) {
					if (item.table === 'buy') {
						withTable_metrices.push(handleChangefuncName(item.name));
					}
					if (item.table === 'products') {
						toTable_metrices.push(handleChangefuncName(item.name));
					}
					if (item.table === 'users') {
						thirdTable_metrices.push(handleChangefuncName(item.name));
					}
				} else {
					if (item.table === 'buy') {
						withTable_dimension.push(handleChangefuncName(item.name));
					}
					if (item.table === 'products') {
						toTable_dimension.push(handleChangefuncName(item.name));
					}
					if (item.table === 'users') {
						thirdTable_dimension.push(handleChangefuncName(item.name));
					}
				}
			});

			const res = await getJoinBuyProductsUsersMetricesAndDimensions(
				token,
				withTable_dimension,
				withTable_metrices,
				toTable_dimension,
				toTable_metrices,
				thirdTable_dimension,
				thirdTable_metrices
			);

			dispatch(setQuerySql(res.data.query));
			dispatch(setQueryResult(res.data.data.data));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Tooltip
			label="click here to run the query"
			color="gray"
			c="black"
			position="bottom"
			withArrow
		>
			<Button
				mr={30}
				leftIcon={<IconPlayerPlayFilled size="1.2rem" />}
				disabled={!disabled}
				sx={{
					':disabled': {
						backgroundColor: 'rgba(225, 225, 225, 0.2)',
					},
				}}
				onClick={
					params.tableName === 'users'
						? handleRunUsersQuery
						: params.tableName === 'products'
						? handleRunJoinProductAndUserQuery
						: handleJoinBuyUsersProducts
				}
			>
				Run query
			</Button>
		</Tooltip>
	);
}

export default RunQueryBtn;
