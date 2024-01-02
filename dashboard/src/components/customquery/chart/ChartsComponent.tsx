import {
	Accordion,
	ActionIcon,
	Button,
	Divider,
	Flex,
	Menu,
	Popover,
	Text,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import {
	IconChartBar,
	IconChevronLeft,
	IconDotsVertical,
	IconDownload,
} from '@tabler/icons-react';
import BarChartComponent from './BarChartComponent';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { setChart } from '../../../redux/chart-type/chart-typeSlice';

interface ParamsInterface {
	tableName: string;
}

function ChartsComponent() {
	const params: ParamsInterface = useParams();
	// const chartType = useSelector((state: RootState) => state.chartType);
	const queryResult = useSelector(
		(state: RootState) => state.queryResult.value
	);
	const dispatch = useDispatch();

	const handleDownloadChart = () => {
		const chartElement = document.querySelector(
			'.echarts-for-react-custom-table'
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

	const disabled =
		params.tableName === 'users' ||
		params.tableName === 'products' ||
		params.tableName === 'buy';

	return (
		<Flex w={'100%'} justify={'center'} mt={30}>
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
				<Accordion.Item value="charts">
					<Flex justify={'start'} align={'center'}>
						<Accordion.Control w={50} h={50} disabled={!disabled}>
							<Text c={'white'}>{''}</Text>
						</Accordion.Control>
						<Text c={'white'}>Charts</Text>
						{queryResult.length !== 0 && (
							<Popover shadow="md" position="right-start" withArrow>
								<Popover.Target>
									<ActionIcon
										radius="xl"
										variant="transparent"
										ml={'auto'}
										mr={40}
									>
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
												Chart type
											</Button>
										</Menu.Target>
										<Menu.Dropdown bg={'rgb(27, 38, 53)'}>
											<Menu.Item
												color="white"
												p={0}
												onClick={() => dispatch(setChart('bar'))}
											>
												<Button fz={12} variant="subtle">
													Bar Chart
												</Button>
											</Menu.Item>
											<Divider w={'100%'} my={5} />
											<Menu.Item
												color="white"
												p={0}
												onClick={() => dispatch(setChart('horizontal_bar'))}
											>
												<Button fz={12} variant="subtle">
													Horizontal Bar Chart
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
						)}
					</Flex>
					<Accordion.Panel>
						{queryResult.length === 0 ? (
							<Flex
								h={200}
								direction={'column'}
								justify={'center'}
								align={'center'}
							>
								<IconChartBar size={'5rem'} color="gray" />
								<Text color="white" fz={20} fw={500} mt={10}>
									No data available
								</Text>
								<Text color="gray" fz={12} fw={400} mt={10}>
									Query metrics and dimensions with results.
								</Text>
							</Flex>
						) : (
							<Flex h={400} justify={'center'} align={'center'}>
								<BarChartComponent />
							</Flex>
						)}
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Flex>
	);
}

export default ChartsComponent;
