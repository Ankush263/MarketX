import { Card, Flex, Progress, Text } from '@mantine/core';
import { IconCash } from '@tabler/icons-react';
import { getToken } from '../token';
import { useQuery } from '@tanstack/react-query';
import { getTotalRevenew } from '../api';

function TotalRevenewCard() {
	const handleGetTotalRevenew = async () => {
		const token = getToken();
		const total = await getTotalRevenew(token);
		return total.data.data.total.totalSum;
	};

	const query = useQuery({
		queryKey: ['total_revenew'],
		queryFn: handleGetTotalRevenew,
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
						$ {query.isLoading ? 'Loading...' : query.data}
					</Text>
					<Text fz={14} color="white">
						Total revenew
					</Text>
				</Flex>
				<IconCash color="rgb(71, 130, 218)" size={50} />
			</Flex>
			<Progress mt={30} radius="md" size="sm" value={23} />
		</Card>
	);
}

export default TotalRevenewCard;
