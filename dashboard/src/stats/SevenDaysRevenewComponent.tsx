import { Flex, Text, ActionIcon, Popover, Button } from '@mantine/core';
import ReactECharts from 'echarts-for-react';
import { getSevenDaysRevenew } from '../api';
import { getToken } from '../token';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IconDotsVertical, IconDownload } from '@tabler/icons-react';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

interface DataInterface {
	weekName: string;
	totalSales: number;
}

function SevenDaysRevenewComponent() {
	const token = getToken();
	const [week, setWeek] = useState<string[]>([]);
	const [data, setData] = useState<string[]>([]);

	const handleGetSevenDaysRevenew = async () => {
		try {
			const revenew = await getSevenDaysRevenew(token);
			const data = revenew.data.data.revenew;
			const weekNames = data.map((i: DataInterface) => i.weekName);
			const sales = data.map((i: DataInterface) => i.totalSales);
			const formattedWeek = weekNames.map((day: string) =>
				day.trim().substring(0, 3)
			);
			setWeek(formattedWeek);
			setData(sales);
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	useQuery({
		queryKey: ['seven_days_reveue'],
		queryFn: handleGetSevenDaysRevenew,
	});

	const handleDownloadChart = () => {
		const chartElement = document.querySelector(
			'.echarts-for-react'
		) as HTMLElement;

		if (chartElement) {
			html2canvas(chartElement).then((canvas) => {
				canvas.toBlob((blob) => {
					if (blob) {
						saveAs(blob, 'chart.png');
					}
				});
			});
		}
	};

	const option = {
		xAxis: {
			type: 'category',
			data: week,
		},
		tooltip: {
			trigger: 'axis',
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				data: data,
				type: 'line',
				smooth: true,
			},
		],
	};
	return (
		<Flex
			bg={'rgba(225, 225, 225, 0.09)'}
			sx={{ borderRadius: '10px' }}
			direction={'column'}
			align={'center'}
		>
			<Flex w={'86%'} mt={20} justify={'space-between'}>
				<Text color="white" fw={500} fz={15}>
					Revenew of past seven days
				</Text>
				<Popover shadow="md" position="right-start" withArrow>
					<Popover.Target>
						<ActionIcon radius="xl" variant="transparent">
							<IconDotsVertical size="1.125rem" />
						</ActionIcon>
					</Popover.Target>
					<Popover.Dropdown py={0} bg={'rgb(27, 38, 53)'} px={0}>
						<Button
							leftIcon={<IconDownload size={'1.2rem'} />}
							fz={12}
							variant="subtle"
							w={150}
							onClick={handleDownloadChart}
						>
							{`Download`}
						</Button>
					</Popover.Dropdown>
				</Popover>
			</Flex>
			<ReactECharts
				option={option}
				style={{ width: '720px', height: '360px' }}
			/>
		</Flex>
	);
}

export default SevenDaysRevenewComponent;
