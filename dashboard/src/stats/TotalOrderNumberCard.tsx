import { Badge, Card, Flex, Progress, Text } from '@mantine/core';
import { IconTruckDelivery } from '@tabler/icons-react';
import { getTotalOrderNumber } from '../api';
import { getToken } from '../token';
import { useQuery } from '@tanstack/react-query';

interface CardSizeInterface {
	w: number;
	h: number;
	iconSize: number;
	fz: number;
}

function TotalOrderNumberCard({ w, h, iconSize, fz }: CardSizeInterface) {
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
		<Card w={w} h={h} radius={'md'} bg={'rgba(225, 225, 225, 0.09)'}>
			<Flex justify={'space-between'} align={'center'}>
				<Flex direction={'column'}>
					<Text fz={fz} color="white">
						{query.isLoading ? 'Loading...' : query.data}
					</Text>
					<Text fz={14} color="white">
						Total number of Order
					</Text>
				</Flex>
				<Flex
					direction={'column'}
					justify={'space-between'}
					align={'center'}
					h={90}
				>
					<Badge radius="sm" variant="filled" mb={10} tt={'capitalize'}>
						Anual
					</Badge>
					<IconTruckDelivery color="rgb(71, 130, 218)" size={iconSize} />
				</Flex>
			</Flex>
			<Progress mt={25} radius="md" size="sm" value={47} />
		</Card>
	);
}

export default TotalOrderNumberCard;
