import { Badge, Card, Flex, Progress, Text } from '@mantine/core';
import { IconReportAnalytics } from '@tabler/icons-react';
import { getToken } from '../token';
import { useQuery } from '@tanstack/react-query';
import { getTodaysRevenew } from '../api';

interface CardSizeInterface {
	w: number;
	h: number;
	iconSize: number;
	fz: number;
}

function TodaysRevenew({ w, h, iconSize, fz }: CardSizeInterface) {
	const handleGetTodaysRevenew = async () => {
		const token = getToken();
		const total = await getTodaysRevenew(token);
		return total.data.data.revenew.sum;
	};

	const query = useQuery({
		queryKey: ['sale_today'],
		queryFn: handleGetTodaysRevenew,
	});
	return (
		<Card w={w} h={h} radius={'md'} bg={'rgba(225, 225, 225, 0.09)'}>
			<Flex justify={'space-between'} align={'center'}>
				<Flex direction={'column'} align={'space-between'}>
					<Text fz={fz} color="white">
						$ {query.isLoading ? 'Loading...' : query.data}
					</Text>
					<Text fz={14} color="white">
						Sales Today
					</Text>
				</Flex>
				<Flex
					direction={'column'}
					justify={'space-between'}
					align={'center'}
					h={90}
				>
					<Badge radius="sm" variant="filled" mb={10} tt={'capitalize'}>
						Today
					</Badge>
					<IconReportAnalytics color="rgb(71, 130, 218)" size={iconSize} />
				</Flex>
			</Flex>
			<Progress mt={25} radius="md" size="sm" value={23} />
		</Card>
	);
}

export default TodaysRevenew;
