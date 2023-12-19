import { Card, Flex, Progress, Text } from '@mantine/core';
import { IconShoppingBag } from '@tabler/icons-react';
import { getTotalProducts } from '../api';
import { getToken } from '../token';
import { useQuery } from '@tanstack/react-query';

function TotalProductCard() {
	const handleGetTotalProducts = async () => {
		const token = getToken();
		const total = await getTotalProducts(token);
		return total.data.data.total.totalProducts;
	};

	const query = useQuery({
		queryKey: ['products'],
		queryFn: handleGetTotalProducts,
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
						Total listed products
					</Text>
				</Flex>
				<IconShoppingBag color="rgb(71, 130, 218)" size={50} />
			</Flex>
			<Progress mt={30} radius="md" size="sm" value={67} />
		</Card>
	);
}

export default TotalProductCard;
