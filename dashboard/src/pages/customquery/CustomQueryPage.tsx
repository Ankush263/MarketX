import { Flex } from '@mantine/core';
import NavComponent from '../../components/customquery/nav/NavComponent';
import ChartsComponent from '../../components/customquery/chart/ChartsComponent';
import TableComponent from '../../components/customquery/table/TableComponent';
import SqlComponents from '../../components/customquery/sql/SqlComponents';
import SidebarComponents from '../../components/customquery/sidebar/SidebarComponents';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { reset } from '../../redux/dimensionAndMatrices/dimensionAndMatricesSlice';
import { useParams } from 'react-router-dom';
import { resetQueryResult } from '../../redux/queryresult/queryResultSlice';
import { resetQuerySql } from '../../redux/querySql/querySqlSlice';

interface Params {
	tableName: string;
}

function CustomQueryPage() {
	const dispatch = useDispatch();
	const params: Params = useParams();

	useEffect(() => {
		if (!params.tableName) {
			dispatch(reset());
			dispatch(resetQueryResult());
			dispatch(resetQuerySql());
		}
	}, [dispatch, params.tableName]);

	return (
		<Flex bg={'rgb(27, 38, 53)'} mih={'100vh'}>
			<Flex
				mih={'100vh'}
				w={'25%'}
				bg={'rgb(35, 48, 68)'}
				direction={'column'}
				align={'center'}
			>
				<SidebarComponents />
			</Flex>
			<Flex w={'75%'} direction={'column'} align={'center'}>
				<Flex w={'100%'}>
					<NavComponent />
				</Flex>
				<Flex w={'100%'}>
					<ChartsComponent />
				</Flex>
				<Flex w={'100%'}>
					<TableComponent />
				</Flex>
				<Flex w={'100%'}>
					<SqlComponents />
				</Flex>
			</Flex>
		</Flex>
	);
}

export default CustomQueryPage;
