import {
	ActionIcon,
	Button,
	Divider,
	Flex,
	Menu,
	Popover,
	Text,
} from '@mantine/core';
import ReactECharts from 'echarts-for-react';
import {
	IconChevronLeft,
	IconDotsVertical,
	IconDownload,
} from '@tabler/icons-react';
import { getProductSellOnTags } from '../../api';
import { getToken } from '../../token';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import '../../styles/style.css';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

interface Types {
	toy: number;
	new: number;
	sale: number;
	exclusive: number;
}

function ProductBasedOnTags() {
	const [data, setData] = useState<Types>({
		toy: 0,
		new: 0,
		sale: 0,
		exclusive: 0,
	});
	const token = getToken();
	const [toggleLabelOutside, setToggleLabelOutside] = useState<boolean>(true);

	const handleGetStats = async () => {
		try {
			const res = await getProductSellOnTags(token);
			setData(res.data.data.result);
			return res.data.data.result;
		} catch (error) {
			console.log(error);
		}
	};

	const query = useQuery({
		queryKey: ['stats_on_tags'],
		queryFn: handleGetStats,
	});

	const handleDownloadChart = () => {
		const chartElement = document.querySelector(
			'.echarts-for-react-pie-table'
		) as HTMLElement;
		const originalBackgroundColor = chartElement.style.backgroundColor;
		chartElement.style.backgroundColor = 'black';
		if (chartElement) {
			html2canvas(chartElement).then((canvas) => {
				canvas.toBlob((blob) => {
					if (blob) {
						saveAs(blob, 'chart.png');
						chartElement.style.backgroundColor = originalBackgroundColor;
					}
				});
			});
		}
	};

	const option = {
		tooltip: {
			trigger: 'item',
		},
		darkmode: true,
		legend: {
			top: '5%',
			left: 'center',
			textStyle: {
				color: 'white',
			},
		},
		series: [
			{
				name: 'Revenew From',
				type: 'pie',
				radius: ['40%', '50%'],
				avoidLabelOverlap: false,
				label: {
					show: true,
					color: 'white',
					position: toggleLabelOutside ? 'outer' : 'inner',
					formatter(param: { name: string; percent: number }) {
						return param.name + ' (' + param.percent! * 2 + '%)';
					},
					distanceToLabelLine: -10,
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 15,
						color: 'white',
					},
				},
				labelLine: {
					show: true,
				},
				data: [
					{ value: data.toy, name: 'Toys' },
					{ value: data.exclusive, name: 'Exclusive' },
					{ value: data.new, name: 'New' },
					{ value: data.sale, name: 'Sale' },
				],
			},
		],
	};

	return (
		<Flex
			bg={'rgba(225, 225, 225, 0.09)'}
			sx={{ borderRadius: '10px' }}
			direction={'column'}
			align={'center'}
			onClick={handleGetStats}
		>
			<Flex
				justify={'space-between'}
				align={'center'}
				w={'86%'}
				mt={20}
				mb={30}
			>
				<Text color="white" fw={500} fz={15}>
					Revenew based on item tags
				</Text>
				<Popover shadow="md" position="right-start" withArrow>
					<Popover.Target>
						<ActionIcon radius="xl" variant="transparent">
							<IconDotsVertical size="1.125rem" />
						</ActionIcon>
					</Popover.Target>
					<Popover.Dropdown py={3} px={3} bg={'rgb(27, 38, 53)'}>
						<Menu shadow="md" width={200} withArrow position="left-start">
							<Menu.Target>
								<Button
									leftIcon={<IconChevronLeft size={'1.2rem'} />}
									fz={12}
									variant="subtle"
									w={150}
								>
									Toggle label
								</Button>
							</Menu.Target>
							<Menu.Dropdown bg={'rgb(27, 38, 53)'}>
								<Menu.Item
									color="white"
									p={0}
									onClick={() => {
										setToggleLabelOutside(true);
										query.refetch();
									}}
								>
									<Button fz={12} variant="subtle">
										Outside
									</Button>
								</Menu.Item>
								<Divider w={'100%'} my={5} />
								<Menu.Item
									color="white"
									p={0}
									onClick={() => {
										setToggleLabelOutside(false);
										query.refetch();
									}}
								>
									<Button fz={12} variant="subtle">
										Inside
									</Button>
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
						<Divider w={'100%'} my={5} />
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
				className="echarts-for-react-pie-table"
				style={{ width: '370px', height: '360px', marginRight: '25px' }}
			/>
		</Flex>
	);
}

export default ProductBasedOnTags;
