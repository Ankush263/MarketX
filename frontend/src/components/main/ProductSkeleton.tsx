import { Flex, Grid, Skeleton } from '@mantine/core';

function ProductSkeleton({ w, h }: { w: number; h: number }) {
	return (
		<Flex direction={'column'} align={'center'} mt="50px">
			<Grid maw={'100%'} w="80%" gutter={'xl'}>
				<Grid.Col md={6} lg={3}>
					<Skeleton w={w} h={h} />
				</Grid.Col>
				<Grid.Col md={6} lg={3}>
					<Skeleton w={w} h={h} />
				</Grid.Col>
				<Grid.Col md={6} lg={3}>
					<Skeleton w={w} h={h} />
				</Grid.Col>
				<Grid.Col md={6} lg={3}>
					<Skeleton w={w} h={h} />
				</Grid.Col>
			</Grid>
		</Flex>
	);
}

export default ProductSkeleton;
