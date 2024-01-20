import { Box, Flex, Grid, Loader, Text } from '@mantine/core';
import Nav from '../components/navbar/Nav';
import { Suspense } from 'react';
import React from 'react';

const ProductPageComponent = React.lazy(
	() => import('../components/product/ProductPageComponent')
);

function ProductPage() {
	return (
		<Flex direction={'column'}>
			<Box>
				<Nav />
			</Box>
			<Flex justify={'center'} align={'center'} w="100%" h={150} mt={20}>
				<Flex
					bg={'#edeef0'}
					w={'80%'}
					h={150}
					direction={'column'}
					justify={'center'}
					align={'center'}
					p={20}
				>
					<Text fz={20} fw={600} ff={'Josefin Sans'}>
						Toys and Games
					</Text>
					<Text align="center" ff={'Josefin Sans'} fz={15}>
						Kids' toys offer more than simply entertainment and activities. The
						majority of toys provide kids at least some learning opportunities.
						The finest toys stimulate a child's senses, ignite their
						imaginations, and promote social interaction. They are presented on
						the market in a huge assortment, so parents should determine which
						toys will benefit the child at a certain age.
					</Text>
				</Flex>
			</Flex>
			<Box mt={20}>
				<Flex direction={'column'} align={'center'} mt="50px">
					<Text fz={'25px'} fw={550} ff={'Josefin Sans'} mb={30}>
						Our Products
					</Text>
					<Grid maw={'100%'} w="80%" gutter={'xl'}>
						<Suspense
							fallback={
								<Grid.Col>
									<Loader />
								</Grid.Col>
							}
						>
							<ProductPageComponent />
						</Suspense>
					</Grid>
				</Flex>
			</Box>
		</Flex>
	);
}

export default ProductPage;
