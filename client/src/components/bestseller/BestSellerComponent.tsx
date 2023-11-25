import { Box, Text, Grid } from '@mantine/core';
import React, { useMemo } from 'react';
import ItemCardComponent from './ItemCard/ItemCardComponent';

function BestSellerComponent() {
	const styles = useMemo(() => ({}), []);
	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				marginTop: '50px',
			}}
		>
			<Text
				fz={'25px'}
				fw={550}
				sx={{ fontFamily: 'Josefin Sans', marginBottom: '30px' }}
			>
				Our Best Sellers
			</Text>
			<Grid maw={'100%'} sx={{ width: '80%' }} gutter={'xl'}>
				<Grid.Col md={6} lg={3}>
					<ItemCardComponent />
				</Grid.Col>
				<Grid.Col md={6} lg={3}>
					<ItemCardComponent />
				</Grid.Col>
				<Grid.Col md={6} lg={3}>
					<ItemCardComponent />
				</Grid.Col>
				<Grid.Col md={6} lg={3}>
					<ItemCardComponent />
				</Grid.Col>
			</Grid>
		</Box>
	);
}

export default BestSellerComponent;
