import { Accordion, Text, Flex } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';

interface ParamsInterface {
	tableName: string;
}

function TableComponent() {
	const params: ParamsInterface = useParams();

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
					<Accordion.Control disabled={!disabled}>
						<Text c={'white'}>Results</Text>
					</Accordion.Control>
					<Accordion.Panel>
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
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Flex>
	);
}

export default TableComponent;
