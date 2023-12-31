import { Box, ScrollArea, Table, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Key } from 'react';
import { handleChangeKeyName } from './utils/changeKeyName';

function MetricesAndDimensionTable() {
	const queryResult = useSelector(
		(state: RootState) => state.queryResult.value
	);
	const metricesAndDimensions = useSelector(
		(state: RootState) => state.dimensionAndMetrices.value
	);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const elements: any[] = queryResult;

	const rows =
		Array.isArray(elements[0]) &&
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		elements[0].map((element: any, index) => (
			<tr key={index}>
				{metricesAndDimensions.map((key, i: Key | null | undefined) => (
					<td key={i}>
						<Text c={'white'}>{element[handleChangeKeyName(key.name)]}</Text>
					</td>
				))}
			</tr>
		));

	return (
		<ScrollArea w={'100%'} h={'100%'}>
			<Box w={1100}>
				<Table withColumnBorders>
					<thead>
						<tr>
							{metricesAndDimensions.map((item) => {
								return (
									<Box
										key={item.name}
										component="th"
										bg={
											item.metrices
												? 'rgba(222, 184, 33, 0.5)'
												: 'rgba(34, 139, 230, 0.5)'
										}
									>
										<Text fz={14} fw={500} color="white" miw={150}>
											{item.name}
										</Text>
									</Box>
								);
							})}
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
			</Box>
		</ScrollArea>
	);
}

export default MetricesAndDimensionTable;
