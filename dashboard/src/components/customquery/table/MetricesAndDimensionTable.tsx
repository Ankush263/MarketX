import { Box, ScrollArea, Table, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

function MetricesAndDimensionTable() {
	const metricesAndDimensions = useSelector(
		(state: RootState) => state.dimensionAndMetrices.value
	);

	// const elements = [
	// 	{ position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
	// 	{ position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
	// 	{ position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
	// 	{ position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
	// 	{ position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
	// ];

	// const rows = elements.map((element) => (
	// 	<tr key={element.name}>
	// 		<td>{element.position}</td>
	// 		<td>{element.name}</td>
	// 		<td>{element.symbol}</td>
	// 		<td>{element.mass}</td>
	// 	</tr>
	// ));
	return (
		<ScrollArea w={'100%'} h={'100%'}>
			<Box w={1100}>
				<Table withColumnBorders>
					<Box component="thead">
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
					</Box>
					{/* <tbody>{rows}</tbody> */}
				</Table>
			</Box>
		</ScrollArea>
	);
}

export default MetricesAndDimensionTable;
