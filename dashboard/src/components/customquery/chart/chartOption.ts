import { reverseChangeKeyName } from '../table/utils/reverseChangeKeyName';

export const barChartOption = (
	data: object[],
	name: string,
	maxValue: number
) => {
	return {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		legend: {
			textStyle: {
				color: 'white',
			},
		},
		grid: {
			left: '5%',
			right: '4%',
			bottom: '10%',
			containLabel: true,
		},
		xAxis: [
			{
				type: 'category',
				name: `${reverseChangeKeyName(name)}`,
				nameLocation: 'middle',
				nameTextStyle: {
					padding: 10,
					color: 'white',
				},
			},
		],
		yAxis: [
			{
				type: 'value',
				min: 0,
				max: Math.ceil(maxValue / 10) * 10,
				axisLabel: {},
			},
		],

		series: data,
	};
};

export const horizontalBarChart = (data: object[], name: string) => {
	return {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		legend: {
			textStyle: {
				color: 'white',
			},
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true,
		},
		xAxis: {
			type: 'value',
		},
		yAxis: {
			type: 'category',
			name: `${reverseChangeKeyName(name)}`,
		},
		series: data,
	};
};
