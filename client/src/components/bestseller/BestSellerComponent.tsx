import { Text, Grid, Flex } from '@mantine/core';
import React from 'react';
import ItemCardComponent from '../Itemcard/ItemCardComponent';

function BestSellerComponent() {
	return (
		<Flex direction={'column'} align={'center'} mt="50px">
			<Text fz={'25px'} fw={550} ff={'Josefin Sans'} mb={30}>
				Our Best Sellers
			</Text>
			<Grid maw={'100%'} w="80%" gutter={'xl'}>
				<Grid.Col md={6} lg={3}>
					<ItemCardComponent width={270} height={420} />
				</Grid.Col>
				<Grid.Col md={6} lg={3}>
					<ItemCardComponent width={270} height={420} />
				</Grid.Col>
				<Grid.Col md={6} lg={3}>
					<ItemCardComponent width={270} height={420} />
				</Grid.Col>
				<Grid.Col md={6} lg={3}>
					<ItemCardComponent width={270} height={420} />
				</Grid.Col>
			</Grid>
		</Flex>
	);
}

export default BestSellerComponent;
