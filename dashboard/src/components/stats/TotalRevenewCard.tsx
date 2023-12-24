import { Badge, Card, Flex, Progress, Text } from '@mantine/core';
import { IconCash } from '@tabler/icons-react';
import { getToken } from '../../token';
import { useQuery } from '@tanstack/react-query';
import { getTotalRevenew } from '../../api';

interface CardSizeInterface {
	w: number;
	h: number;
	iconSize: number;
	fz: number;
}

function TotalRevenewCard({ w, h, iconSize, fz }: CardSizeInterface) {
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
		<Card w={w} h={h} radius={'md'} bg={'rgba(225, 225, 225, 0.09)'}>
			<Flex justify={'space-between'} align={'center'}>
				<Flex direction={'column'} align={'space-between'}>
					<Text fz={fz} color="white">
						$ {query.isLoading ? 'Loading...' : query.data}
					</Text>
					<Text fz={14} color="white">
						Total revenew
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
					<IconCash color="rgb(71, 130, 218)" size={iconSize} />
				</Flex>
			</Flex>
			<Progress mt={25} radius="md" size="sm" value={23} />
		</Card>
	);
}

export default TotalRevenewCard;
