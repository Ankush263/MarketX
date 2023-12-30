import { Accordion, Flex, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../redux/store';

interface ParamsInterface {
	tableName: string;
}

function SqlComponents() {
	const params: ParamsInterface = useParams();
	const sql = useSelector((state: RootState) => state.querySql.value);

	const disabled =
		params.tableName === 'users' ||
		params.tableName === 'products' ||
		params.tableName === 'buy';

	const coloredString = (sql: string) => {
		const keywordsToColors: { [key: string]: string } = {
			SELECT: 'red',
			AS: 'red',
			ON: 'red',
			GROUP: 'red',
			SUM: 'orange',
			BY: 'red',
			FROM: 'red',
			WHERE: 'red',
			TO: 'red',
			'GROUP BY': 'red',
			products: 'blue',
			users: 'blue',
			buy: 'blue',
			MAX: 'orange',
			MIN: 'orange',
			UNIQUE: 'orange',
			COUNT: 'orange',
			LEFT: 'orange',
			OUTER: 'orange',
			JOIN: 'orange',
		};

		const parts = sql.split(/\b/);

		return parts.map((part, index) => (
			<span
				key={index}
				style={
					keywordsToColors[part.toUpperCase()]
						? { color: keywordsToColors[part.toUpperCase()] }
						: {}
				}
			>
				{part}
			</span>
		));
	};

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
					<Flex justify={'start'} align={'center'}>
						<Accordion.Control w={50} h={50} disabled={!disabled}>
							<Text c={'white'}>{''}</Text>
						</Accordion.Control>
						<Text c={'white'}>SQL</Text>
					</Flex>
					<Accordion.Panel p={30}>
						{sql === '' ? (
							<Text c={'white'}>No SQL data Available</Text>
						) : (
							<Text
								c={'white'}
								sx={{ whiteSpace: 'pre-wrap' }}
								onClick={() => console.log(coloredString(sql))}
							>
								{coloredString(sql)}
							</Text>
						)}
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Flex>
	);
}

export default SqlComponents;
