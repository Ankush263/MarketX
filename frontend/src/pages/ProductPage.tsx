import { Box, Flex, Grid, Loader, Text } from '@mantine/core';
import Nav from '../components/navbar/Nav';
import { getProducts } from '../api';
import { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { setProductAction } from '../redux/products/productSlice';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductInterface } from '../interface';

const ItemCardComponent = React.lazy(
	() => import('../components/Itemcard/ItemCardComponent')
);

function ProductPage() {
	const dispatch = useDispatch();

	const fetch = async () => {
		try {
			const product = await getProducts();
			dispatch(setProductAction(product.data.data.doc));
			return product.data.data.doc;
		} catch (error) {
			console.log(error);
		}
	};

	const fetchProductsQuery = useQuery({
		queryKey: ['all-products'],
		queryFn: fetch,
	});

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
						{fetchProductsQuery.isFetching && (
							<Flex justify={'center'} align={'center'} w={'100%'} h={'100vh'}>
								<Loader />
							</Flex>
						)}
						{fetchProductsQuery.isSuccess &&
							fetchProductsQuery.data?.map((product: ProductInterface) => {
								return (
									<Grid.Col md={6} lg={4} key={product.id}>
										<Suspense
											fallback={
												<Flex
													justify={'center'}
													align={'center'}
													w={'100%'}
													h={'100vh'}
												>
													<Loader />
												</Flex>
											}
										>
											<ItemCardComponent
												width={380}
												height={620}
												product={product}
											/>
										</Suspense>
									</Grid.Col>
								);
							})}
					</Grid>
				</Flex>
			</Box>
		</Flex>
	);
}

export default ProductPage;
