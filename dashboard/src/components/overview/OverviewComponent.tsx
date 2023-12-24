import { Button, Divider, Flex, Text, Tooltip } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useState } from 'react';
import { callSuccessNotification } from '../../notification';
import TotalRevenewCard from '../stats/TotalRevenewCard';
import TotalProductCard from '../stats/TotalProductCard';
import TodaysRevenew from '../stats/TodaysRevenew';
import TotalOrderNumberCard from '../stats/TotalOrderNumberCard';
import SevenDaysRevenewComponent from '../stats/SevenDaysRevenewComponent';
import ProductBasedOnTags from '../stats/ProductBasedOnTags';
import { useQueryClient } from '@tanstack/react-query';

function OverviewComponent() {
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	const queryClient = useQueryClient();

	const handleRefresh = () => {
		setIsRefreshing(true);
		queryClient.refetchQueries({ queryKey: ['seven_days_reveue'] });
		queryClient.refetchQueries({ queryKey: ['stats_on_tags'] });
		queryClient.refetchQueries({ queryKey: ['total_revenew'] });
		queryClient.refetchQueries({ queryKey: ['products'] });
		queryClient.refetchQueries({ queryKey: ['sale_today'] });
		queryClient.refetchQueries({ queryKey: ['total_order'] });
		setTimeout(() => {
			callSuccessNotification('Successfully update all the details');
			setIsRefreshing(false);
		}, 2000);
	};

	return (
		<Flex direction={'column'} justify={'center'} align={'center'}>
			<Flex mt={100} w={'90%'} justify={'space-between'} align={'center'}>
				<Flex direction={'column'}>
					<Text color="white" fz={30} fw={500}>
						Dashboard
					</Text>
					<Text color="white" fz={15}>
						Welcome back!! happy to see you here. 👋
					</Text>
				</Flex>
				<Tooltip
					label="Click refresh to update details"
					color="gray"
					c={'black'}
					withArrow
				>
					<Button
						leftIcon={
							<IconRefresh
								size="1.1rem"
								className={isRefreshing ? 'rotate-icon' : ''}
							/>
						}
						onClick={handleRefresh}
						fz={13}
					>
						Refresh
					</Button>
				</Tooltip>
			</Flex>
			<Divider w={'90%'} mt={30} mb={30} color="rgba(225, 225, 225, 0.4)" />
			<Flex justify={'space-between'} align={'center'} w={'90%'}>
				<TotalRevenewCard w={270} h={150} iconSize={40} fz={30} />
				<TotalProductCard w={270} h={150} iconSize={40} fz={30} />
				<TodaysRevenew w={270} h={150} iconSize={40} fz={30} />
				<TotalOrderNumberCard w={270} h={150} iconSize={40} fz={30} />
			</Flex>
			<Flex w={'90%'} mt={30} mb={50} justify={'space-between'}>
				<SevenDaysRevenewComponent />
				<ProductBasedOnTags />
			</Flex>
		</Flex>
	);
}

export default OverviewComponent;
