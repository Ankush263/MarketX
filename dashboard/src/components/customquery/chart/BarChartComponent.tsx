import { Flex, Loader } from '@mantine/core';
import ReactECharts from 'echarts-for-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { handleChangeKeyName } from '../table/utils/changeKeyName';
import { reverseChangeKeyName } from '../table/utils/reverseChangeKeyName';
import { useEffect, useState } from 'react';
import { barChartOption, horizontalBarChart } from './chartOption';

function BarChartComponent() {
	const [dimenssions, setDimensions] = useState<string[]>(['']);
	const [metricesData, setMetricesData] = useState<object[]>([]);
	const [maxValue, setMaxValue] = useState<number>(0);
	const chartType = useSelector((state: RootState) => state.chartType);
	const dispatch = useDispatch();
	const queryResult = useSelector(
		(state: RootState) => state.queryResult.value
	);
	const metricesAndDimensions = useSelector(
		(state: RootState) => state.dimensionAndMetrices.value
	);
	const load = useSelector((state: RootState) => state.load.value);

	useEffect(() => {
		let updatedMetrices: string[] = [];
		const updatedDimensions: string[] = [];

		metricesAndDimensions.forEach(
			(item: { name: string; metrices: boolean }) => {
				if (item.metrices) {
					updatedMetrices.push(handleChangeKeyName(item.name));
				} else {
					updatedDimensions.push(handleChangeKeyName(item.name));
				}
			}
		);

		const stringsToRemove = [
			'minBuyCreatedAt',
			'maxBuyCreatedAt',
			'maxProductsCreatedAt',
			'minProductsCreatedAt',
			'maxUsersCreatedAt',
			'minUsersCreatedAt',
		];

		updatedMetrices = updatedMetrices.filter(
			(item) => !stringsToRemove.includes(item)
		);

		const structuredData: { [key: string]: number[] } = {};

		Array.isArray(queryResult[0]) &&
			queryResult[0].forEach((result) => {
				updatedMetrices.forEach((metrices) => {
					if (!structuredData[metrices]) {
						structuredData[metrices] = [];
					}
					structuredData[metrices].push(Number(result[metrices]));
				});
			});

		const data: object[] = [];
		const maxNumbers: number[] = [];
		Object.keys(structuredData).map((key) => {
			maxNumbers.push(Math.max(...structuredData[key]));
			data.push({
				name: reverseChangeKeyName(key),
				type: 'bar',
				stack: reverseChangeKeyName(key),
				emphasis: {
					focus: 'series',
				},
				data: structuredData[key],
			});
		});

		const max = Math.max(...maxNumbers);
		setMaxValue(max);
		setMetricesData(data);
		setDimensions(updatedDimensions);
	}, [dispatch, metricesAndDimensions, queryResult]);

	return (
		<Flex w={'100%'} h={'100%'} justify={'center'} align={'center'}>
			{load ? (
				<Flex justify={'center'} align={'center'} w={'100%'} h={'100%'}>
					<Loader variant="dots" />
				</Flex>
			) : (
				<ReactECharts
					option={
						chartType.bar
							? barChartOption(metricesData, dimenssions[0], maxValue)
							: chartType.horizontal_bar
							? horizontalBarChart(metricesData, dimenssions[0])
							: barChartOption(metricesData, dimenssions[0], maxValue)
					}
					className="echarts-for-react-custom-table"
					style={{
						width: '100%',
						height: '100%',
					}}
				/>
			)}
		</Flex>
	);
}

export default BarChartComponent;
