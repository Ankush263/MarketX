import { Accordion, Flex, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';

interface ParamsInterface {
	tableName: string;
}

function SqlComponents() {
	const params: ParamsInterface = useParams();

	const disabled =
		params.tableName === 'users' ||
		params.tableName === 'products' ||
		params.tableName === 'buy';

	return (
		<Flex w={'100%'} justify={'center'} mt={30} mb={30}>
			<Accordion
				chevronPosition="left"
				w={'96%'}
				bg={'rgb(35, 48, 68)'}
				styles={{
					chevron: {
						color: 'white',
					},
				}}
			>
				<Accordion.Item value="sql">
					<Accordion.Control disabled={!disabled}>
						<Text c={'white'}>SQL</Text>
					</Accordion.Control>
					<Accordion.Panel>
						Colors, fonts, shadows and many other parts are customizable to fit
						your design needs
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Flex>
	);
}

export default SqlComponents;
