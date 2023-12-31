import { Accordion, Text, Flex } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import MetricesAndDimensionTable from './MetricesAndDimensionTable';

interface ParamsInterface {
	tableName: string;
}

function TableComponent() {
	const params: ParamsInterface = useParams();
	const metricesAndDimensions = useSelector(
		(state: RootState) => state.dimensionAndMetrices.value
	);

	const disabled =
		params.tableName === 'users' ||
		params.tableName === 'products' ||
		params.tableName === 'buy';

	return (
		<Flex w={'100%'} justify={'center'} mt={30}>
			<Accordion
				chevronPosition="left"
				defaultValue="results"
				w={'96%'}
				bg={'rgb(35, 48, 68)'}
				styles={{
					chevron: {
						color: 'white',
					},
				}}
			>
				<Accordion.Item value="results">
					<Flex justify={'start'} align={'center'}>
						<Accordion.Control w={50} h={50} disabled={!disabled}>
							<Text c={'white'}>{''}</Text>
						</Accordion.Control>
						<Text c={'white'}>Results</Text>
					</Flex>
					<Accordion.Panel>
						{metricesAndDimensions.length === 0 ? (
							<Flex
								h={300}
								direction={'column'}
								justify={'center'}
								align={'center'}
							>
								<IconDatabase size={'10rem'} color="gray" />
								<Text color="white" fz={20} fw={500} mt={15}>
									Select a table
								</Text>
								<Text color="gray" fz={12} fw={400} mt={15}>
									To run a query, first select the table that you would like to
									explore.
								</Text>
							</Flex>
						) : (
							<Flex
								mih={300}
								mah={400}
								direction={'column'}
								justify={'start'}
								align={'center'}
							>
								<MetricesAndDimensionTable />
							</Flex>
						)}
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Flex>
	);
}

export default TableComponent;
