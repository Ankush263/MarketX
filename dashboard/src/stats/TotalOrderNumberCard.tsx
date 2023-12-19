import { Card, Flex, Progress, Text } from '@mantine/core';
import { IconTruckDelivery } from '@tabler/icons-react';
import { getTotalOrderNumber } from '../api';
import { getToken } from '../token';
import { useQuery } from '@tanstack/react-query';

function TotalOrderNumberCard() {
	const handleGetTotalNumberOfProduct = async () => {
		const token = getToken();
		const total = await getTotalOrderNumber(token);
		return total.data.data.total.count;
	};

	const query = useQuery({
		queryKey: ['total_order'],
		queryFn: handleGetTotalNumberOfProduct,
	});

	return (
		<Card
			w={300}
			h={150}
			mr={20}
			mb={20}
			radius={'md'}
			bg={'rgba(225, 225, 225, 0.09)'}
		>
			<Flex justify={'space-between'} align={'center'}>
				<Flex direction={'column'}>
					<Text fz={40} color="white">
						{query.isLoading ? 'Loading...' : query.data}
					</Text>
					<Text fz={14} color="white">
						Total number of Order
					</Text>
				</Flex>
				<IconTruckDelivery color="rgb(71, 130, 218)" size={50} />
			</Flex>
			<Progress mt={30} radius="md" size="sm" value={47} />
		</Card>
	);
}

export default TotalOrderNumberCard;
