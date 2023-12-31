import { Button, Flex, Tooltip } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useState } from 'react';
import { callSuccessNotification } from '../../../notification';
import { useParams } from 'react-router-dom';
import RunQueryBtn from './RunQueryBtn';
import { useDispatch } from 'react-redux';
import { reset } from '../../../redux/dimensionAndMatrices/dimensionAndMatricesSlice';
import { resetQueryResult } from '../../../redux/queryresult/queryResultSlice';
import { resetQuerySql } from '../../../redux/querySql/querySqlSlice';

interface ParamsInterface {
	tableName: string;
}

function NavComponent() {
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	const params: ParamsInterface = useParams();
	const dispatch = useDispatch();

	const disabled =
		params.tableName === 'users' ||
		params.tableName === 'products' ||
		params.tableName === 'buy';

	const handleRefresh = () => {
		setIsRefreshing(true);
		dispatch(reset());
		dispatch(resetQueryResult());
		dispatch(resetQuerySql());
		setTimeout(() => {
			callSuccessNotification('Successfully update all the details');
			setIsRefreshing(false);
		}, 2000);
	};
	return (
		<Flex
			w={'100%'}
			h={50}
			mt={40}
			direction={'row'}
			justify={'space-between'}
			align={'center'}
		>
			<Tooltip
				label="Click refresh to update the user details"
				color="gray"
				c={'black'}
				position="bottom-start"
				withArrow
			>
				<Button
					leftIcon={
						<IconRefresh
							size="1.2rem"
							className={isRefreshing ? 'rotate-icon' : ''}
						/>
					}
					variant="outline"
					onClick={handleRefresh}
					ml={30}
					sx={{ ':disabled': { backgroundColor: 'rgba(225, 225, 225, 0.2)' } }}
					disabled={!disabled}
				>
					Reset
				</Button>
			</Tooltip>
			<RunQueryBtn />
		</Flex>
	);
}

export default NavComponent;
